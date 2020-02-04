import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Injectable({
  providedIn: "root"
})
export class WebSocketService {
  constructor() {}
  url: WebSocketSubject<string> = webSocket("ws://demos.kaazing.com/echo");
  // myWebSocket: WebSocketSubject<any> = webSocket("ws://demos.kaazing.com/echo");
  // myWebSocket.next(message: 'some message');
  mostrar() {
    this.url.subscribe(msg => console.log("El mensaje es: " + msg));
  }
}
