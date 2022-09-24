import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NetworkService} from "../network.service";
import {$$, getParams, showError, showMessage} from "../../tools";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, Subject} from "rxjs";
import {WalletConnectProvider} from '@elrondnetwork/erdjs-wallet-connect-provider';
import {WalletProvider} from "@elrondnetwork/erdjs-web-wallet-provider"
import {Location} from "@angular/common";
import {NFT} from "../../nft";
import {Collection, Operation} from "../../operation";
import {UserService} from "../user.service";

//Test : http://localhost:4200/wallet?addr=LqCeF9WJWjcoTJqWp1gH9t6eYVg8vnzUCGBpNUzFbNr&toolbar=false
@Component({
  selector: 'app-mywallet',
  templateUrl: './mywallet.component.html',
  styleUrls: ['./mywallet.component.css']
})
export class MywalletComponent implements OnInit,OnDestroy {
  nfts: NFT[]=[];
  indexTab: number=0;
  url_key: any="";
  showDetail=false;

  @Input("filter") filter="";

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  photos_to_send: string[]=[];
  qrcode:string="";
  qrcode_addr:string="";
  provider:WalletConnectProvider | null=null;
  private hAccessCode: any;
  access_code: any;
  message:string="";
  tab_title: string="Vos NFTs";
  opes: Operation[]=[];
  sel_ope:Operation | null=null;
  previews: any[]=[];
  owner: string="";
  attributes:string="";
  token_to_send: any=null;
  collections:Collection[]=[{
    description: undefined,
    id: "*",
    owner: undefined,
    price: undefined,
    visual: undefined,
    name:"Toutes"}];
  sel_collection: Collection=this.collections[0];
  image_for_token: string="";
  secret: string="";


  constructor(public routes:ActivatedRoute,
              public toast:MatSnackBar,
              public router:Router,
              public user:UserService,
              public _location:Location,
              public network:NetworkService) {

  }


  generate_qrcode(){
    this.network.get_access_code(this.user.addr).subscribe((r:any)=>{
      this.url_key=r.image;
      this.access_code=r.access_code;
    });
  }

  ngOnInit(): void {
    getParams(this.routes,"wallet_params").then((params:any)=>{
      this.user.addr=params["addr"];
      if(!this.user.addr)showMessage(this,"Adresse non disponible, vous pouvez fermer cette fenêtre");
      this.showDetail=params["show_detail"] || false;
      this.network.network=params["network"] || "elrond-mainnet";
      this.generate_qrcode();
      this.hAccessCode=setInterval(()=>{this.generate_qrcode()},30000);
      this.refresh();
    },()=>{
      this.router.navigate(["pagenotfound"],{queryParams:{toolbar:false,message:"cette page ne correspond pas à un wallet connu"}});
    });
  }



  force_refresh(){
    this.nfts=[];
    this.refresh(0);
  }

  refresh(index:number=0) {
    $$("Refresh de l'onglet "+index);
    if(index==0 && this.nfts.length==0){
      this.message="Chargement NFTs";

      for(let arg of [[0,5],[6,20],[21,50],[51,100],[101,200]]){
        let offset=arg[0];
        let limit=arg[1];
        setTimeout(()=>{
          this.network.get_tokens_from("owner",this.user.addr,limit,false,null,offset,this.network.network).then((r:NFT[])=>{

            for(let nft of r){
              if(this.collections.map((x:Collection)=>{return x.name}).indexOf(nft.collection["name"])==-1)this.collections.push(nft.collection);
              if(this.sel_collection.id=="*" || nft.collection.name==this.sel_collection.name){
                this.message="";
                this.nfts.push(nft);
              }
            }
            if(r.length==0) {
              if (arg[0] == 0){
                showMessage(this, "Vous n'avez aucun NFT pour l'instant")
                this.tab_title="Vos NFTs";
              }
              else {
                if(r.length>1){
                  this.tab_title="Vos "+r.length+" NFTs";
                } else {
                  this.tab_title="Votre NFT";
                }
              }

            }
          }).catch(err=>{showError(this,err)});
        },offset*500);
      }
    }
    if(index==2){
      this.open_nftlive();
    }
  }


  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }


  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }


  handleImage(event: any) {
    var rc=event;
    if(!rc.startsWith('data:'))rc=rc+"data:image/jpeg;base64,"
    this.image_for_token=rc;
    this.message="Fabrication des modèles sur la base de l'image suivante";
    setTimeout(()=>{
      if(this.sel_ope && this.sel_ope.nftlive){
        this.network.send_photo_for_nftlive(
          this.sel_ope?.nftlive.limit,
          this.sel_ope?.nftlive?.configuration,
          this.sel_ope.nftlive.nft_target.dimensions,
          this.sel_ope.nftlive.nft_target.quality,
          this.attributes,
          {photo:rc}).subscribe((r:any)=>{
          this.message="";
          this.image_for_token="";
          this.photos_to_send=r.images.map((x:string)=>{return environment.server+"/api/images/"+x});
        },(err)=>{showError(this)});
      }
    },50);
  }


  photo() {
    this.trigger.next();
  }



  send(image:string) {
    if(this.sel_ope?.nftlive){
      let collection:Collection= {
        name: this.sel_ope?.nftlive!.nft_target.collection,
        id: undefined,
        visual: undefined,
        description: undefined,
        owner: undefined,
        price: undefined
      };

      let token:NFT= {
        attributes: [],
        collection: collection,
        description: "description",
        files: [],
        marketplace: {quantity: 1, price: 0},
        message: undefined,
        name: this.sel_ope?.nftlive!.nft_target.name,
        network: this.network.network,
        owner: this.user.addr,
        royalties: this.sel_ope.nftlive.nft_target.royalties,
        visual: image,
        symbol: '',
        creators: [],
        address: undefined,
        solana: undefined,
        style: undefined
      }

      if(this.sel_ope?.nftlive?.nft_target.miner){

        if(!this.owner)this.owner=this.user.addr;

        this.message="Minage en cours";
        this.network.mint(token,this.sel_ope?.nftlive?.nft_target.miner,this.owner,false,"nftstorage",this.network.network).then((r:any)=>{
          this.message="";
          showMessage(this,"Votre NFT est miné et envoyé. Vous pouvez en miner un autre");
          this.token_to_send=null;
        })
      }
    }

  }



  ngOnDestroy(): void {
    clearInterval(this.hAccessCode);
  }



  show_elrond_addr() {
    this.network.qrcode(this.user.addr,"json").subscribe((result:any)=>{
      this.qrcode_addr=result.qrcode;
    })

  }

  get_nft(nft: NFT) {
    if(nft.owner && nft.address){
      this.network.get_nft(nft.owner,nft.address,this.network.network).subscribe(()=>{

      });
    }
  }

  open_nftlive() {
    this.network.nftlive_access(this.user.addr,this.network.network).subscribe((r:any)=>{
      this.opes=r;
      if(r.length==1)this.sel_ope=r[0];
    })
  }

  on_upload($event: any) {
    this.handleImage($event.file)
  }

  reset() {
    this.photos_to_send=[];
  }

  get_opacity(img: string) {
    if(!this.token_to_send)return 1;
    if(img==this.token_to_send)return 1;
    return 0.4;
  }

  update_identity_photo($event: any) {
    this.secret=$event.file;
  }

  save_privacy() {
    this.network.save_privacy(this.user.addr,this.secret).subscribe(()=>{
      this.user.strong=false;
    })
  }
}