import { Document, Model } from 'mongoose';

export interface IModel<T extends Document> extends Model<T> {
  queryBuilder: (any) => any;
}
