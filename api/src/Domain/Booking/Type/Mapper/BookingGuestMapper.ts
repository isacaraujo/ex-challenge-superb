import { serialize } from 'cerialize';

import { Guest } from '../../Entity/Guest';

class BookingGuestMapper {
  public constructor(private readonly guest: Guest) {}

  @serialize
  public get Name(): string {
    return this.guest.Name;
  }

  @serialize
  public get Email(): string {
    return this.guest.Email;
  }
}

export { BookingGuestMapper };
