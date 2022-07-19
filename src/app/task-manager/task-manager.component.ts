import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-task-manager",
  templateUrl: "./task-manager.component.html",
  styleUrls: ["./task-manager.component.scss"],
})
export class TaskManagerComponent implements OnInit {
  constructor(private taskManagerService: ApiService) {}
  disableBtn = false;
  priorityActive: any = "all";
  message: any = "";
  assignTo: any;
  priority: any = "1";
  dateTime: any;
  taskid: any = null;

  ngOnInit(): void {
    this.listUsers();
  }

  searchByKey(event: any) {
    let value = event.target.value.trim();
    if (value == "") {
      this.allList = this.tempAllList;
    } else {
      this.allList = this.tempAllList.filter((item: any) => {
        if (item.message.toLowerCase().includes(value)) {
          return item;
        }
      });
    }
  }

  filterByType(type: any) {
    this.priorityActive = type;
    if (type == "all") {
      this.allList = this.tempAllList;
    } else if (type == "high") {
      this.allList = this.tempAllList.filter((item: any) => {
        if (item.priority == "3") {
          return item;
        }
      });
    } else if (type == "medium") {
      this.allList = this.tempAllList.filter((item: any) => {
        if (item.priority == "2") {
          return item;
        }
      });
    } else {
      this.allList = this.tempAllList.filter((item: any) => {
        if (item.priority == "1") {
          return item;
        }
      });
    }
  }

  sortByOrder(event: any) {
    let value = event.target.value;
    if (value == "Newest") {
      this.allList = this.allList.sort((a: any, b: any) => {
        return a.id - b.id;
      });
    } else if (value == "Oldest") {
      this.allList = this.allList.sort((a: any, b: any) => {
        return b.id - a.id;
      });
    }
  }

  getNameById(id: any) {
    return this.allUsers.filter((item: any) => item.id == id)[0]?.name;
  }

  addTask() {
    this.disableBtn = false;
    this.message = "";
    this.assignTo = "";
    this.priority = "1";
    this.dateTime;
    this.taskid = null;
  }

  allUsers: any;
  listUsers() {
    this.taskManagerService.listUsers().subscribe((res: any) => {
      this.allUsers = res.users;
      this.listTasks();
    });
  }

  allList: any;
  tempAllList: any;
  listTasks() {
    this.taskManagerService.listTasks().subscribe((res: any) => {
      this.allList = res.tasks;
      this.tempAllList = res.tasks;
    });
  }

  editTemplate(id: any) {
    let temp = this.allList.filter((item: any) => {
      if (item.id == id) {
        return item;
      }
    })[0];
    this.disableBtn = false;
    this.message = temp.message;
    this.assignTo = temp.assigned_to;
    this.priority = temp.priority;
    this.dateTime = new Date(temp.due_date).toISOString().slice(0, 16);
    this.taskid = temp.id;
  }

  updateTask() {
    if (this.message.trim() == "") {
      return alert("Please Add some Message");
    }
    this.disableBtn = true;
    let body = new FormData();
    body.append("taskid", this.taskid);
    body.append("message", this.message);
    body.append("due_date", this.dateTime);
    body.append("priority", this.priority);
    body.append("assigned_to", this.assignTo);

    this.taskManagerService.updateTask(body).subscribe((res: any) => {
      if (res.status == "success") {
        document.getElementById("closeModel")?.click();
        this.listTasks();
      }
    });
  }

  saveTask() {
    if (this.message.trim() == "") {
      return alert("Please Add some Message");
    }
    this.disableBtn = true;
    let body = new FormData();
    body.append("message", this.message);
    body.append("due_date", this.dateTime);
    body.append("priority", this.priority);
    body.append("assigned_to", this.assignTo);

    this.taskManagerService.createTask(body).subscribe((res: any) => {
      if (res.status == "success") {
        document.getElementById("closeModel")?.click();
        this.listTasks();
      }
    });
  }

  deleteTask(id: any) {
    let body = new FormData();
    body.append("taskid", id);
    this.taskManagerService.deleteTask(body).subscribe((res: any) => {
      if (res.status == "success") {
        this.listTasks();
      }
    });
  }
}
