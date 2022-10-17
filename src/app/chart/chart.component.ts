import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepoService } from '../repo.service';
import { ChartElement } from '../_models/ChartElement';
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
  chartElementList: ChartElement[]=[];
  WIDTH =300;
  HEIGHT = 300;
  ELEMENT_WIDTH =70;
  ELEMENT_HEIGHT = 40;
  PADDING=10;

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
      this.repo.getList(this.id).then(list => {
        this.list = list
        this.chartElementList = this.setChartElementList(this.list);
      });
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

  onAdd(){
    this.repo.add({
      name: 'Nuevo Item',
      parent: this.selected.id,
      root: this.id,
      level: this.selected.level +1,
      description:''
    }).then(id => this.getList());
  }

  onClick(item: OrgaItem){
    this.selected = item;
  }

  onDelete(){
    if (this.selected.id) {
      this.repo.delete(this.selected.id).then(() =>{
        this.selected = this.root;
        this.getList();
      });
    }
  }

  setChartElementList(list: OrgaItem[]): ChartElement[]{
    const result: ChartElement[]=[];
    const x = this.WIDTH/2;
    const y = this.ELEMENT_HEIGHT;
    const root: ChartElement = {
      item: this.root,
      x: x,
      y: y,
      childrenCount: 0,
      category: 0,
    }
    result.push(root);
    this.setChildren(result,root,list);
    return result;
  }

  setChildren(result: ChartElement[], parent: ChartElement, list: OrgaItem[]){
    const children = list.filter(item => item.parent === parent.item.id);
    parent.childrenCount = children.length
    for (let index = 0; index < children.length; index++) {
      const child = children[index];
      const offset = parent.x - (children.length - 1) /2 * (this.ELEMENT_WIDTH + this.PADDING *2);
      const element = {
        x: offset + (this.ELEMENT_WIDTH + this.PADDING *2) * index,
        y: parent.y + this.ELEMENT_HEIGHT *2,
        item: child,
        parent: parent,
        category: parent.category || index,
        childrenCount: 0,
      };
      result.push(element);
      this.setChildren(result,element,list);
    }
  }
}
