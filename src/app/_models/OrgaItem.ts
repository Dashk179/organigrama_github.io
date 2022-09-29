export interface OrgaItem{
    id?: number,
    name: string,
    parent?: number,
    root?: number,
    level: number,
    description: string
}