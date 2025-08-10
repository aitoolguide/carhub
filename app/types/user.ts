// src/types/user.ts

import { IUser as IDB_User } from '../database/models/User';

/**
 * The full User type, extending the database model with a string ID for frontend use.
 */
export interface IUser extends Omit<IDB_User, 'password'> {
  _id: string;
}
