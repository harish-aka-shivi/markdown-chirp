import { User } from "../../models/user/entity";


declare global{
  namespace Express {
    interface Request {
      user: User,
      token: string,
    }
  }
}
