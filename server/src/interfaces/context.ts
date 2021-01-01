import { Request, Response } from 'express'
import { User } from '../models/user/entity';

export interface IContext {
  req: Request
  res: Response
  user?: User,
  token?: string,
}
