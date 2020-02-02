import { WorkingDay } from './WorkingDay';

class Restaurant {
  private id: string;

  private tablesCount: number;

  private workingDays: WorkingDay[];

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

  public get WorkingDays(): WorkingDay[] {
    return this.workingDays;
  }

  public set WorkingDays(workingDays: WorkingDay[]) {
    this.workingDays = workingDays;
  }
}

export { Restaurant };
