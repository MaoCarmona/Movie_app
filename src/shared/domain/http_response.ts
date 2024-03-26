export class HttpResponse<T> {
  constructor(
    public readonly data: T,
    public readonly success: boolean,
    public readonly message: string
  ) {}
}
