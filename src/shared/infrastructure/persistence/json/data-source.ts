/* eslint-disable no-console */
import * as fs from "fs-extra";

export class JsonDataSource<T> {
  private data: T[];

  public constructor(private readonly filePath: string = "movies.json") {}

  public async loadData(): Promise<void> {
    try {
      const fileContent: string = await fs.readFile(this.filePath, "utf8");
      this.data = JSON.parse(fileContent);
    } catch (error) {
      console.error("Error loading JSON data:", error);
      this.data = [];
    }
  }

  public async getData(): Promise<T[]> {
    if (!this.data) {
      await this.loadData();
    }
    return this.data;
  }

  public async writeData(data: T[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
      console.error("Error writing JSON data:", error);
    }
  }
}
