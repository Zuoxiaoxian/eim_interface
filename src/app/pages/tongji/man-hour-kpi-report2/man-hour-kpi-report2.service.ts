import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManKpiReport2Service {

    constructor() { }

    // 订阅的属性：用来给订阅方存储数据
    public currentMessage = new BehaviorSubject<boolean>(false);

    // 订阅的方法：用来接收发布方的数据
    changeMessage(message: boolean): void {
        this.currentMessage.next(message);
    }

    // 订阅的数据
    public currentData = new BehaviorSubject<Object>({});

    // 订阅的方法：用来接收发布方的数据
    changeData(message: Object): void {
        this.currentData.next(message);
    }

}




