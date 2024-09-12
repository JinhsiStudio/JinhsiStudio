export interface IGachaSetting {
  url: string;
  logPath: string;
}
export class GachaSetting implements IGachaSetting {
  url: string;
  logPath: string;
  constructor(url: string, logPath: string) {
    this.url = url;
    this.logPath = logPath;
  }
}
