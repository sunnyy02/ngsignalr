import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  users$ =  new BehaviorSubject([]);

  constructor() {
    this.startConnection();
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:44316/user')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public notifyAdmin = () => {
    this.hubConnection.on('notifyAdmin', (data) => {
      this.users$.next(data.split(','));
      console.log('notify admin:', data);
    });
  }

  public userPing( userName): void {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected){
      this.hubConnection
      .invoke('UserRegister', userName)
      .catch(err => console.error('userPing error:', err));
    }
  }
}
