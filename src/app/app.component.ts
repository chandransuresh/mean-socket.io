import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  socket;
  newUserAddedData;

  constructor() {
    this.socket = io({transports: ['websocket', 'polling']});
  }

  public ngOnInit(): void {
    this.socket.on('newUserAdded', (data) => {
      console.log(data);
      this.newUserAddedData = data;
    });
  }
}
