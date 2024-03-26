export class BaseModel {
  public constructor(data: BaseModel) {
    Object.assign(this, data);
  }
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
}
