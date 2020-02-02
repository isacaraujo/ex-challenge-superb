import {
    IMongooseConnection
} from '../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection';
import {
    MongooseRepository
} from '../../../Core/Database/Driver/Mongoose/Repository/MongooseRepository';
import { FindRecordError } from '../../../Core/Error/Repository/FindRecordError';
import { RecordNotFoundError } from '../../../Core/Error/Repository/RecordNotFoundError';
import { SaveRecordError } from '../../../Core/Error/Repository/SaveRecordError';
import { Restaurant } from '../Entity/Restaurant';
import { RestaurantRecordFactory } from './Factory/RestaurantRecordFactory';
import { IRestaurantRepository } from './IRestaurantRepository';
import { IRestaurantModel } from './Model/IRestaurantModel';
import { RestaurantSchema } from './Schema/RestaurantSchema';

class RestaurantRepository extends MongooseRepository<IRestaurantModel> implements IRestaurantRepository {
  private static readonly COLLECTION_NAME = 'restaurants';

  public constructor(connection: IMongooseConnection) {
    super(connection, RestaurantRepository.COLLECTION_NAME, RestaurantSchema);
  }

  public async create(restaurant: Restaurant): Promise<void> {
    try {
      const record = RestaurantRecordFactory.createRecord(restaurant);

      const newRecord = await this.documentModel.create(record);

      restaurant.Id = newRecord.id;
    } catch (error) {
      throw new SaveRecordError(`SaveRecordError: ${error.message}`, error);
    }
  }

  public async update(restaurant: Restaurant): Promise<void> {
    try {
      const record = RestaurantRecordFactory.createRecord(restaurant);

      const conditions = {_id: restaurant.Id };

      const changeset = { '$set': record };

      await this.documentModel.updateOne(conditions, changeset);
    } catch (error) {
      throw new SaveRecordError(`SaveRecordError: ${error.message}`, error);
    }
  }

  public async findOne(): Promise<Restaurant> {
    let record;
    try {
      record = await this.documentModel.findOne();
    } catch (error) {
      throw new FindRecordError('Unable to find restaurant', error);
    }

    if (!record) {
      throw new RecordNotFoundError('Restaurant not found');
    }

    return RestaurantRecordFactory.createFromRecord(record);
  }
}

export { RestaurantRepository };
