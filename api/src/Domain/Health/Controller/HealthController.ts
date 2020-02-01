import { IHealthStatusFactory } from '../Factory/IHealthStatusFactory';

import { IHealthController } from './IHealthController';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import { ActionController } from '../../../Core/Controller/ActionController';

class HealthController extends ActionController implements IHealthController {
  public constructor(private readonly healthStatusFactory: IHealthStatusFactory) {
    super();
  }

  public async perform(): Promise<IHttpResponse> {
    const status = this.healthStatusFactory.create();

    const mapper = status.toMapper();
    
    return this.createSuccessResponse(mapper);
  }
}

export { HealthController };
