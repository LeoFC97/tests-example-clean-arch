import MongoDBManager from './mongodb-manager';
import { mongodb } from '../../../config/index';

export default function start(): void {
  MongoDBManager.initialize(mongodb.uri);
}
