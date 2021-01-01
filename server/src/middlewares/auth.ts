import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import { JSON_WEB_SECRET_KEY } from '../config/envVariables';
import { User } from '../models/user/entity';


const auth = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const secret = JSON_WEB_SECRET_KEY ? JSON_WEB_SECRET_KEY : '';
    const authHeader = req.header('Authorization');
    const token = authHeader ? authHeader.replace('Bearer ', '') : "";
    const decoded: any = jwt.verify(token, secret);
    // console.log(decoded);
    const userRepo = getConnection().getRepository(User);
    if (decoded.username) {
      const user = await userRepo.findOne({ username: decoded.username, });
      if(!user) {
        throw new Error("User not authorized");
      }
      if (token !== user.token) {
        throw new Error("User not authorized");
      }
      req.token = token;
      req.user = user; // passing the data to route to prevent extra computation. 
    }

    next();
  } catch (error) {
    res.status(401).send({"error": "please authenticate"}); 
  }

}

export default auth;