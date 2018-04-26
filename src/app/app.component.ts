import { HttpClient } from '@angular/common/http';
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
  tasks = [];
  constructor(private http: HttpClient) {
    this.socket = io({transports: ['websocket', 'polling']});
  }

  public ngOnInit(): void {
    this.socket.on('newUserAdded', (data) => {
      console.log(data);
      this.newUserAddedData = data;
    });
    this.socket.on('newTaskAdded', (data) => {
      console.log(data);
      this.tasks.push(data.newTask);
    })

    this.http.get<{tasks: any[]}>('/tasks')
    .subscribe(data => this.tasks = data.tasks);
  }

  addTask(newTask) {
    this.http.post('/tasks', {
      taskName: newTask
    },
    {observe: 'response'})
    .subscribe(res => {
      console.log(res);
    });
  }
}
