import {DocumentManager} from '../utils/db/dataManager';
import {DbErrorModel} from './dbError';

export class DbModels {
  static error = new DocumentManager<DbErrorModel>('error');
}
