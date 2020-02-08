import { WithStyles } from '@material-ui/core';

import { RestaurantEditStyles } from './Styles/RestaurantEditStyles';
import { IContainerService } from '../../../Core/Container/IContainerService';

interface IRestaurantEditProps extends WithStyles<typeof RestaurantEditStyles> {
  container: IContainerService;
}

const IRestaurantEditProps = Symbol.for('IRestaurantEditProps');

export { IRestaurantEditProps };
