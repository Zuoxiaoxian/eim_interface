import { Injectable } from '@angular/core';

const ls = localStorage;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  // 公共方法 可以根据key得到Local Storage

  public get<T>(key: string): any {
    return JSON.parse(ls.getItem(key)) as T;
  }



  public getList<T>(key: string) {
    const before = ls.getItem(key);
    return before ? (JSON.parse(before) as T[]):[];
  }


  public set(key:string, value: any):void {
    if (!value && value == undefined){
      return ;
    }
    const arr = JSON.stringify(value);
    ls.setItem(key,arr);
  }

  public del(key: string){
    ls.removeItem(key);
  }
}
