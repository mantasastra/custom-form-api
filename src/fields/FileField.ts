import { BaseField } from "./BaseField";

export type File = {
  id: string;
  type: string;
  size: number; // in MB
  url: string;
};

export class FileField extends BaseField {
  public files: File[];

  constructor(title: string, description: string, required: boolean) {
    super("file", title, description, required);

    this.files = [];
  }

  public addFile(file: File) {
    this.files.push(file);
  }

  public removeFile(fileId: string) {
    this.files.splice(
      this.files.findIndex(({ id }) => {
        return id === fileId;
      }),
      1
    );
  }
}
