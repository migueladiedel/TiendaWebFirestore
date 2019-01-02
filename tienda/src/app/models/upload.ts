export class Upload {
  id: string;
  file: File;
  name: string;
  url: string;
  created_at: Date = new Date();
  constructor(file: File) {
    this.file = file;
  }
}
