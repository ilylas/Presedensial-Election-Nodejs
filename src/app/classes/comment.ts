export class Comment {
    username: string;
    text: string;
  
    constructor(username: string, text: string, date?: string) {
      this.username = username;
      this.text = text;
    }
}