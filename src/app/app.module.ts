import { NgModule } from '@angular/core';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from '@abacritt/angularx-social-login';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MywalletComponent } from './mywallet/mywallet.component';
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {WebcamModule} from "ngx-webcam";
import {ReverseblocComponent} from "./reversebloc/reversebloc.component";
import {HourglassComponent} from "./hourglass/hourglass.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {LoginComponent} from "./login/login.component";
import {MatInputModule} from "@angular/material/input";
import {UploadFileComponent} from "./upload-file/upload-file.component";
import {FormsModule} from "@angular/forms";
import {GOOGLE_CLIENT_ID} from "../definitions";
import {AuthentComponent} from "./authent/authent.component";
import {ScannerComponent} from "./scanner/scanner.component";
import {SplashComponent} from "./splash/splash.component";
import {FaqsComponent} from "./faqs/faqs.component";
import {MatExpansionModule} from "@angular/material/expansion";

const routes: Routes = [
  { path: '', component: MywalletComponent }
]

/*
Tester le wallet : http://wallet.nfluent.io/?param=YWRkcj1lcmQxNmNrNjJlZ252bXVzaGtma3V0M3lsdHV4MzBjdnA1YWx1eTY5dThwNWhlemt4ODlhMmVucWY4cGx0OCZ0b29sYmFyPWZhbHNlJnRha2VQaG90bz10cnVlJm5ldHdvcms9ZWxyb25kLWRldm5ldA%253D%253D

 */

@NgModule({
    declarations: [
        AppComponent,
        UploadFileComponent,
        AuthentComponent,
        ScannerComponent,
        FaqsComponent,
        LoginComponent,
        MywalletComponent,
        ReverseblocComponent,
        HourglassComponent,
        SplashComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    WebcamModule,
    SocialLoginModule,
      MatExpansionModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatFormFieldModule,
    ClipboardModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatProgressBarModule,
    MatSelectModule
  ],
  providers: [
    {provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(GOOGLE_CLIENT_ID),
          }
        ],
      } as SocialAuthServiceConfig}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}