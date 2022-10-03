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

  getItem(id: number): Promise<OrgaItem>{
    const result: Promise<OrgaItem> = new Promise((resolve, reject) =>{
      this.DB.then(db =>{
        const transaction = db.transaction(this.STORAGE_NAME,'readonly');
        const store = transaction.objectStore(this.STORAGE_NAME);
        const request = store.get(id);
        request.onsuccess = () => {
          resolve(request.result);
        };
      });
    });
    return result;
  }

  getList(parent: number){}

  add(item: OrgaItem){}

  update(item: OrgaItem){}

  delete(id: number){}
}
