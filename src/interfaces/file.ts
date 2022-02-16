export interface IFile {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  name: string;
  mimetype: string;
  size: number;
  category?: string;
  path: string;
}

export interface IFileInput {
  category: string;
  files: any;
}
