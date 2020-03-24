import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {
  private hubConnection: HubConnection;
//https://stackoverflow.com/questions/54297637/how-to-hook-up-signalr-with-an-angular-7-application
  constructor() { }
  public ngOnInit() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:50930/pushNotification").build();

    this.hubConnection.start().then(() => {
      console.log("connection started");
    }).catch(err => console.log(err));

    this.hubConnection.onclose(() => {
      debugger;
      setTimeout(() => {
        debugger;
        this.hubConnection.start().then(() => {
          debugger;
          console.log("connection started");
        }).catch(err => console.log(err));
      }, 5000);
    });

    this.hubConnection.on("clientMethodName", (data) => {
      debugger;
      console.log(data);
    });

    this.hubConnection.on("WelcomeMethodName", (data) => {
      debugger;
      console.log(data);
      this.hubConnection.invoke("GetDataFromClient", "user id", data).catch(err => console.log(err));
    });
  }

  public stopConnection() {
    this.hubConnection.start().then(() => {
      console.log("stopped");
    }).catch(err => console.log(err));
  }


}
