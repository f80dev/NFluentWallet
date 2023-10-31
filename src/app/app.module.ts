import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AuthentComponent } from './authent/authent.component';
import { PromptComponent } from './prompt/prompt.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PaymentComponent } from './payment/payment.component';
import { SignatureComponent } from './signature/signature.component';
import { HourglassComponent } from './hourglass/hourglass.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { SplashComponent } from './splash/splash.component';
import { ScannerComponent } from './scanner/scanner.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";
import {MatCardModule} from "@angular/material/card";
import { MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {MatProgressBarModule} from "@angular/material/progress-bar";

import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {DeviceService} from "./device.service";
import {RouterModule, Routes} from "@angular/router";
import { SafePipe } from './safe.pipe';
import {MatExpansionModule} from "@angular/material/expansion";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {FileDragNDropDirective} from './file-drag-ndrop.directive';
import { AboutComponent } from './about/about.component';
import {WebcamModule} from "ngx-webcam";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {environment} from "../environments/environment";
import {GOOGLE_CLIENT_ID} from "../definitions";
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {FilterPipe} from "./filter.pipe";
import {RescuewalletComponent} from "./rescuewallet/rescuewallet.component";
import {AliasPipe} from "./alias.pipe";
import {MywalletComponent} from "./mywallet/mywallet.component";
import {ReverseblocComponent} from "./reversebloc/reversebloc.component";
import {GooglePayButtonModule} from "@google-pay/button-angular";
import {TutoComponent} from "./tuto/tuto.component";
import {LinkComponent} from "./link/link.component";

const config: SocketIoConfig = { url: environment.server, options: {} };

const routes: Routes = [
  { path: '', component: MywalletComponent },
  { path: 'wallet', component: MywalletComponent },
  { path: 'rescue', component: RescuewalletComponent },
  { path: 'rescuewallet', component: RescuewalletComponent }
]

/*
Tester le wallet : http://wallet.nfluent.io/?param=YWRkcj1lcmQxNmNrNjJlZ252bXVzaGtma3V0M3lsdHV4MzBjdnA1YWx1eTY5dThwNWhlemt4ODlhMmVucWY4cGx0OCZ0b29sYmFyPWZhbHNlJnRha2VQaG90bz10cnVlJm5ldHdvcms9ZWxyb25kLWRldm5ldA%253D%253D

 */

@NgModule({
  declarations: [
    AppComponent,
    AliasPipe,
    UploadFileComponent,
    AuthentComponent,
    RescuewalletComponent,
    PaymentComponent,
    ScannerComponent,
    FaqsComponent,
    InputComponent,
    FileDragNDropDirective,
    AboutComponent,
    PromptComponent,
    LinkComponent,
    SignatureComponent,
    FilterPipe,
    SafePipe,
    LoginComponent,
    MywalletComponent,
    ReverseblocComponent,
    HourglassComponent,
    SplashComponent,
    AboutComponent,
    TutoComponent
  ],
  imports: [
    SocketIoModule.forRoot(config),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    GooglePayButtonModule,
    MatSliderModule,
    WebcamModule,
    MatCardModule,
    SocialLoginModule,
    MatExpansionModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatFormFieldModule,
    ClipboardModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatListModule,
    GoogleSigninButtonModule
  ],
  providers: [
    AliasPipe, DeviceService,
    {provide: MAT_DIALOG_DATA, useValue: {hasBackdrop: false}},
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
