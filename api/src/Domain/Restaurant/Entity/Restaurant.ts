import * as _ from 'lodash';

class Restaurant {
  public static readonly DAY_IN_HOURS = 24;

  public static readonly SLOT_DURATION = 1;

  private id: string;

  private tablesCount: number;

  private openTime: number;

  private closeTime: number;

  public get Id(): string {
    return this.id;
  }

  public set Id(id: string) {
    this.id = id;
  }

  public get TablesCount(): number {
    return this.tablesCount;
  }

  public set TablesCount(tablesCount: number) {
    this.tablesCount = tablesCount;
  }

  public get OpenTime(): number {
    return this.openTime;
  }

  public set OpenTime(openTime: number) {
    this.openTime = openTime;
  }

  public get CloseTime(): number {
    return this.closeTime;
  }

  public set CloseTime(closeTime: number) {
    this.closeTime = closeTime;
  }

  public get IsCloseInNextDay(): boolean {
    return this.closeTime < this.openTime;
  }

  public get TimeSlots(): number[] {
    let endTime = this.closeTime;

    if (this.IsCloseInNextDay) {
      endTime += Restaurant.DAY_IN_HOURS;
    }

    const slots = [];

    for (let i = this.openTime; i < endTime; i += 1) {
      let time = i;

      if (time >= Restaurant.DAY_IN_HOURS) {
        time -= Restaurant.DAY_IN_HOURS;
      }

      slots.push(time);
    }

    return slots;
  }

  public incrementTable(): void {
    this.tablesCount += 1;
  }

  public setTimeRange(openTime: number, closeTime: number): void {
    this.openTime = openTime;

    this.closeTime = closeTime;
  }
}

export { Restaurant };
