import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  
  form: any;
  formTitle!: string;
  
  constructor() {}

  ngOnInit(): void {
    this.formTitle = 'Nova Tarefa';
    this.form = new FormGroup({
      activity: new FormControl(null),
      type: new FormControl(null),
      status: new FormControl(null)
    });
  }
}
