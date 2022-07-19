import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  createTask(data: any) {
    return this.http.post('https://devza.com/tests/tasks/create', data, {
      headers: {
        AuthToken: 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a',
      },
    });
  }

  updateTask(data: any) {
    return this.http.post('https://devza.com/tests/tasks/update', data, {
      headers: {
        AuthToken: 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a',
      },
    });
  }

  deleteTask(data: any) {
    return this.http.post('https://devza.com/tests/tasks/delete', data, {
      headers: {
        AuthToken: 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a',
      },
    });
  }

  listTasks() {
    return this.http.get('https://devza.com/tests/tasks/list', {
      headers: {
        AuthToken: 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a',
      },
    });
  }

  listUsers() {
    return this.http.get('https://devza.com/tests/tasks/listusers', {
      headers: {
        AuthToken: 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a',
      },
    });
  }
}
