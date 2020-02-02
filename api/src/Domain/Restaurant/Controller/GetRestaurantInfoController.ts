import { ActionController } from '../../../Core/Controller/ActionController';
import { IHttpRequest } from '../../../Core/Http/Type/IHttpRequest';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import { IFindCurrentRestaurantOperation } from '../Operation/IFindCurrentRestaurantOperation';
import { RestaurantMapper } from '../Type/Mapper/RestaurantMapper';
import { IGetRestaurantInfoController } from './IGetRestaurantInfoController';

class GetRestaurantInfoController extends ActionController implements IGetRestaurantInfoController {
  public constructor(
    private readonly findCurrentRestaurant: IFindCurrentRestaurantOperation
  ) {
    super();
  }

  public async perform(_request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const restaurant = await this.findCurrentRestaurant.execute();

      const mapper = RestaurantMapper.create(restaurant);

      return this.createSuccessResponse(mapper);
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { GetRestaurantInfoController };
