import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepoService } from '../repo.service';
import { OrgaItem } from '../_models/OrgaItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private repo: RepoService) { }

  selectdId?: number;
  list: OrgaItem[] = [];


  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.repo.getList(0).then(list => {
      this.list = list;
      if (this.list.length) {
        this.selectdId = list[0].id;
      }
    });
  }

  onClick(item:OrgaItem){
    this.selectdId = item.id;
  }

  onDblClick(item:OrgaItem){
    this.router.navigate(['chart',item.id]);
  }

  onAdd(){
    const item: OrgaItem ={
      name: 'Nuevo Organigrama',
      parent: 0,
      root: 0,
      level: 0,
      description: ''
    };
    this.repo.add(item).then( id => {
      this.router.navigate(['chart',id])
    });
  }

  onDelete(){
    if (!this.selectdId) {
      return;
    }
    this.repo.delete(this.selectdId).then(() =>{
      this.getList();
    });
  }
}

