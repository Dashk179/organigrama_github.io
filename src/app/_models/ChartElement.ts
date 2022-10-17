import { OrgaItem } from "./OrgaItem";

export interface ChartElement{
    x: number,
    y: number,
    item: OrgaItem,
    parent?: ChartElement,
    childrenCount:number,
    category:number,
    connection?:string
}