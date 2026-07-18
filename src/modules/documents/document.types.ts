export interface UploadDocumentInput {
  title: string;
  userId: string;
  file: Express.Multer.File;
}
