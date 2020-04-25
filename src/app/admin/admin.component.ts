import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../service/signalr.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users$ = this.service.users$;
  constructor(private service: SignalrService) { }

  ngOnInit() {
    this.service.notifyAdmin();
  }
}
