class GachaLog implements IGachaLog{
    constructor(convene:Convene,items:GachaItem[]){
        this.convene = convene;
        this.items = items;
    }
    convene: Convene;
    items: GachaItem[];
}