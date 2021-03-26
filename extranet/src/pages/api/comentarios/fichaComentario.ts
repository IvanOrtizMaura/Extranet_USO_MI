
export default interface fichaComentario{
  id:number;
  author: string;
  createdTime: Date;
  modifiedTime: Date;
  htmlContent: string;
  content:string;
  replies:string;
}