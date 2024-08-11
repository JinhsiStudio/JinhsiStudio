export interface IGachaSetting {
    url: string,
}
export class GachaSetting implements IGachaSetting {
    url: string;
    constructor(url: string) {
        this.url = url;
    }
}