import * as fs from 'fs-extra';

export class JsonDataSource {
  private data: any[];

  constructor(private readonly filePath: string = 'movies.json') {}

  async loadData(): Promise<void> {
    try {
      const fileContent = await fs.readFile(this.filePath, 'utf8');
      this.data = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error loading JSON data:', error);
      this.data = [];
    }
  }

  async getData(): Promise<any[]> {
    if (!this.data) {
      await this.loadData();
    }
    return this.data;
  }

  async writeData(data: any): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing JSON data:', error);
    }
  }
}
const jsonFilePath:string = 'movies.json';
const dataSource: JsonDataSource = new JsonDataSource(jsonFilePath);

dataSource.getData()
  .then(data => {
    console.log('Data loaded:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
