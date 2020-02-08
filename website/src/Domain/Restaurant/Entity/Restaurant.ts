class Restaurant {
  private tablesCount?: number;

  private openTime?: number;

  private closeTime?: number;

  public get TablesCount(): number | undefined {
    return this.tablesCount;
  }

  public set TablesCount(count: number | undefined) {
    this.tablesCount = count;
  }

  public get OpenTime(): number | undefined {
    return this.openTime;
  }

  public set OpenTime(openTime: number | undefined) {
    this.openTime = openTime;
  }

  public get CloseTime(): number | undefined {
    return this.closeTime;
  }

  public set CloseTime(closeTime: number | undefined) {
    this.closeTime = closeTime;
  }
}

export { Restaurant };
