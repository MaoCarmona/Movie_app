import type { JsonDataSource } from "./json/data-source";

export abstract class JsonRepository<T> {
  public constructor(protected readonly jsonDataSource: JsonDataSource<T>) {}

  protected abstract get entityName(): string;

  protected async getAll(): Promise<T[]> {
    const data = await this.jsonDataSource.getData();
    return data;
  }

  protected async persist(model: T): Promise<T[]> {
    const data = await this.jsonDataSource.getData();
    data.push(model);
    await this.jsonDataSource.writeData(data);
    return data;
  }
}
