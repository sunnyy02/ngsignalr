import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalrService } from '../service/signalr.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit, OnDestroy {
  userName = 'default user';

  interval;

  constructor(private service: SignalrService) { }

  public ngOnInit() {
    this.interval = setInterval(() =>{
      this.service.userPing(this.userName);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
   }
  }
}
