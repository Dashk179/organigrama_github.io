import { Injectable } from '@angular/core';
import { OrgaItem } from './_models/OrgaItem';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor() { }

  getItem(id: number){}

  getList(parent: number){}

  add(item: OrgaItem){}

  update(item: OrgaItem){}

  delete(id: number){}
}
