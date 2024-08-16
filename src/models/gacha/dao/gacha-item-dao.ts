export interface IGachaItemDao{
    id: number,
    rarity: number,
    name: string,
    date: string,
}

export class GachaItemDao implements IGachaItemDao{
    constructor(id:number,rariry:number,name:string,date:string){
        this.id = id;
        this.rarity = rariry;
        this.name = name;
        this.date = date;
    }
    id: number;
    rarity: number;
    name: string;
    date: string;
}