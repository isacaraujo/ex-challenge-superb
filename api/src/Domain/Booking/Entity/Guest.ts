class Guest {
  public constructor(
    private readonly name: string,
    private readonly email: string
  ) {}

  public get Name(): string {
    return this.name;
  }

  public get Email(): string {
    return this.email;
  }
}

export { Guest };
