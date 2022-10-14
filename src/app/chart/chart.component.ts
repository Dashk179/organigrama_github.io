import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepoService } from '../repo.service';
import { OrgaItem } from '../_models/OrgaItem';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  id?: number;
  newItem: OrgaItem = {name:"New Item", level:1, description:''};
  selected = this.newItem;
  root = this.newItem;
  list: OrgaItem[]=[];

  constructor(private route:ActivatedRoute, private repo:RepoService) { }

  getRoot(){
    if (this.id) {
      this.repo.getItem(this.id).then(item =>{
        this.root = item;
        this.selected = this.root;
      });
    }
  }

  getList(){
    if (this.id) {
      this.repo.getList(this.id).then(list => this.list = list);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap =>{
      const id = paramMap.get('id');
      if (id) {
        this.id = Number(id);
      }
      this.getRoot();
      this.getList();
    });
  }

  onChange(){
    this.repo.update(this.selected).then(()=>{
      this.getList();
    });
  }

}
