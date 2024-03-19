import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from '../../Task';
import { TasksService } from '../../tasks.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  
  form: any;
  formTitle!: string;
  tasks!: Task[];
  filteredTasks!: Task[];
  activity!: string;
  taskId!: number;

  tableVisibility: boolean = true
  formVisibility: boolean = false;

  modalRef!: BsModalRef;
  
  constructor(private tasksService: TasksService, private modalService: BsModalService) { }

  ngOnInit(): void {

    this.tasksService.GetAll().subscribe(result => {
      this.tasks = result;
      this.filteredTasks = result;
    })
  }

  ShowRegisterForm(): void {
    this.tableVisibility = false;
    this.formVisibility = true;
    this.formTitle = 'Nova Tarefa';
    this.form = new FormGroup({
      activity: new FormControl(null),
      type: new FormControl(null),
      status: new FormControl(null)
    });
  }

  ShowUpdateForm(taskId : number): void {
    this.tableVisibility = false;
    this.formVisibility = true;

    this.tasksService.GetById(taskId).subscribe(result => {
      this.formTitle = `Atualizar ${result.activity}`;
      this.form = new FormGroup ({
        taskId: new FormControl(result.taskId),
        activity: new FormControl(result.activity),
        type: new FormControl(result.type),
        status: new FormControl(result.status)
      });
    });
  }

  SendForm(): void {
    const task : Task = this.form.value;

    if(task.taskId > 0) {
      this.tasksService.UpdateTask(task).subscribe(result => {
        this.formVisibility = false;
        this.tableVisibility = true;
        alert("Tarefa atualizada com sucesso");
        this.tasksService.GetAll().subscribe((records) => {
          this.tasks = records;
          this.filteredTasks = records;
        });
      });
    }
    else {
      this.tasksService.SaveTask(task).subscribe(result => {
        this.formVisibility = false;
        this.tableVisibility = true;
        alert("Tarefa criada com sucesso");
        this.tasksService.GetAll().subscribe((records) => {
          this.tasks = records;
          this.filteredTasks = records;
        });
      });
    }
  }

  Return(): void {
    this.tableVisibility = true;
    this.formVisibility = false;
  }

  ShowDeleteConfirmation(taskId: number, activity: string, modalContent: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(modalContent);
    this.taskId = taskId;
    this.activity = activity;
  }

  DeleteTask(taskId: number) {
    this.tasksService.DeleteTask(taskId).subscribe(result => {
      this.modalRef.hide();
      alert("Tarefa excluída com sucesso");
      this.tasksService.GetAll().subscribe(records => {
        this.tasks = records;
        this.filteredTasks = records;
      });
    });
  }

  FilterByTask(statusInput: HTMLInputElement) {
    if (statusInput.value) {
      this.filteredTasks = this.tasks.filter(p => p.status === statusInput.value)
    }
  }

  Sort() {
    this.filteredTasks = this.filteredTasks.sort((a, b) => a.status.localeCompare(b.status));
  }

  Reload() {
    window.location.reload();
  }
}
