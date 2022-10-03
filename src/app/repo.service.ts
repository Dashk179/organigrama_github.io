import { Injectable } from '@angular/core';
import { OrgaItem } from './_models/OrgaItem';

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  DB: Promise<IDBDatabase>;
  DB_NAME = 'org-data';
  DB_VERSION = 1;
  STORAGE_NAME = 'data';

  constructor() {
    this.DB = new Promise((resolve,reject) =>{
      const request = window.indexedDB.open(this.DB_NAME,this.DB_VERSION);
      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e);
      request.onupgradeneeded = () => {
        const store = request.result.createObjectStore(this.STORAGE_NAME,{
          keyPath: 'id',
          autoIncrement: true
        });
        store.createIndex('root','root',{unique:false});
      };
    });
   }

  getItem(id: number){}

  getList(parent: number){}

  add(item: OrgaItem){}

  update(item: OrgaItem){}

  delete(id: number){}
}
