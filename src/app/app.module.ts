import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { firebaseConfig } from './firebaseConfig';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from "@angular/forms";
import { BackHeaderComponent } from './ExtraComps/back-header/back-header.component';
import { MainServiceService } from './Services/mainService/main-service.service';
import { MainHeaderComponent } from './ExtraComps/main-header/main-header.component';
import { ViewMastersComponent } from './Components/Main/view-masters/view-masters.component';
import { AddMastersComponent } from './Components/Main/add-masters/add-masters.component';
import { ViewFieldsComponent } from './Components/Main/view-fields/view-fields.component';
import { AddFieldsComponent } from './Components/Main/add-fields/add-fields.component';
import { ModalHeaderComponent } from './ExtraComps/modal-header/modal-header.component';
import { CommonService } from './Services/commonService/common.service';
@NgModule({
  declarations: [
    AppComponent,
    // Main Components
    ViewMastersComponent,
    AddMastersComponent,
    ViewFieldsComponent,
    AddFieldsComponent,
    //Extra Components
    BackHeaderComponent,
    MainHeaderComponent,
    ModalHeaderComponent,
  ],
  entryComponents: [
    // Main Components
    AddMastersComponent,
    //Extra Components
    BackHeaderComponent,
    MainHeaderComponent,
    ModalHeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MainServiceService,
    CommonService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
