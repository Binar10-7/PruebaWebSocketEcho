import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { EchoService } from 'ngx-laravel-echo';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

import Echo from 'laravel-echo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // url: WebSocketSubject<any> = webSocket('wss://echo.websocket.org');
  // title = 'sockets';
  // mensaje: string;

  data = [];

  /**
   *
   * @app.module.ts - Configuración de Echo
   *
   * https://www.npmjs.com/package/ngx-laravel-echo
   * https://chancezeus.github.io/angular-laravel-echo/index.html
   * https://www.npmjs.com/package/angular-laravel-echo
   *
   * npm install --save laravel-echo pusher-js
   *
   * @angular.json
   * scripts: "node_modules/pusher-js/dist/web/pusher.min.js"
   */

  constructor(private socket: WebSocketService, private _echo: EchoService) {}

  ngOnInit() {
    // this.echo.join('home', 'public');
    // Escuchar lo que hay en el canal

    this._echo.connectionState.subscribe(data => {
      console.log(data);

      if (this._echo.connected) {
        console.log('Conectado - Se recibirán mensajes');

        this._echo
          // Primero hay que entrar al canal y especificar su tipo (publico o privado)
          .join('home', 'public')
          // Especificar canal y evento (generalmente public)
          .listen('home', 'NewMessage')
          // Subscripción
          .subscribe(
            res => {
              // Called whenever there is a message from the server.
              this.data.push(res.message);
              console.log(this.data);
            },
            err => {
              // Called if at any point WebSocket API signals some kind of error.
              console.log(err);
            },
            () => {
              // Called when connection is closed (for whatever reason).
              console.log('Desconectado del canal');
            }
          );
      }
    });

    // this.url.subscribe(
    //   msg => {
    //     console.log('message received: ');
    //     console.log(msg);
    //   }, // Called whenever there is a message from the server.
    //   err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
    //   () => console.log('complete') // Called when connection is closed (for whatever reason).
    // );
  }

  mostrar() {}

  conectar() {
    this._echo.listen('home', 'newMessage').subscribe(
      msg => {
        console.log(msg);
        this.data = msg;
      }, // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  cerrar() {
    this._echo.leave('home');
  }
}
