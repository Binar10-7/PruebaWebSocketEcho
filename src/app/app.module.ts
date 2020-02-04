import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  EchoConfig,
  NgxLaravelEchoModule,
  EchoService,
  ECHO_CONFIG
} from 'ngx-laravel-echo';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Configuración de Echo
export const echoConfig: EchoConfig = {
  userModel: '',
  notificationNamespace: '',
  options: {
    broadcaster: 'pusher',
    key: 'ASDASD3131',
    wsHost: '192.168.1.19',
    // authEndpoint: '',
    // host: 'http://192.168.1.19' + ':6001',
    wsPort: 6001
  }
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLaravelEchoModule.forRoot(echoConfig)
  ],
  providers: [
    EchoService,
    { provide: ECHO_CONFIG, useValue: echoConfig } // See ngx-laravel-echo.js Line ~1916 for explanation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
