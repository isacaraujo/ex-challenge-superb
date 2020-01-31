class Guest {
  public constructor(
    private name: string,
    private email: string
  ) {}

  public get Name(): string {
    return this.name;
  }

  public get Email(): string {
    return this.email;
  }
}

export { Guest };
