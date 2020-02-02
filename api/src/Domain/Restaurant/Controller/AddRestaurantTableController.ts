import { ActionController } from '../../../Core/Controller/ActionController';
import { IHttpRequest } from '../../../Core/Http/Type/IHttpRequest';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import { IAddRestaurantTableOperation } from '../Operation/IAddRestaurantTableOperation';
import { IFindCurrentRestaurantOperation } from '../Operation/IFindCurrentRestaurantOperation';
import { RestaurantMapper } from '../Type/Mapper/RestaurantMapper';
import { IAddRestaurantTableController } from './IAddRestaurantTableController';

class AddRestaurantTableController extends ActionController implements IAddRestaurantTableController {
  public constructor(
    private readonly findCurrentRestaurant: IFindCurrentRestaurantOperation,
    private readonly addRestaurantTable: IAddRestaurantTableOperation
  ) {
    super();
  }

  public async perform(_request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const restaurant = await this.findCurrentRestaurant.execute();

      await this.addRestaurantTable.execute(restaurant);

      const mapper = RestaurantMapper.create(restaurant);

      return this.createSuccessResponse(mapper);
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { AddRestaurantTableController };
