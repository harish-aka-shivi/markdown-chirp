import { Inject, Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { User } from '../models/user/entity'
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { compare, hash } from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { JSON_WEB_SECRET_KEY } from '../config/envVariables';
import { IContext } from '../interfaces/context';

@Service()
export default class UserService {
  @InjectRepository(User)
  private readonly repository!: Repository<User>;

  async getUser(userId: string): Promise<User> {
    const user = await this.repository.findOne(userId);
    if (!user) throw new UserInputError('User does not exist.')
    return user;
  }

  async login(username: string, password: string): Promise<User> {
    const secret = JSON_WEB_SECRET_KEY ? JSON_WEB_SECRET_KEY : '';
    const user = await this.repository.findOne({ where: { username } });
    if (!user) {
      throw new AuthenticationError('The credentials provided are incorrect.');
    }
    const doesPassMatch = await compare(password, user.password);

    if (!doesPassMatch) {
      throw new AuthenticationError('The credentials provided are incorrect.')
    }

    const token = jwt.sign({ username: user.username.toString() }, secret);
    
    await this.repository.createQueryBuilder().update().set({
      token: token
    }).where("username = :username", { username: user.username }).execute();

    return user;
  }

  async createUser(username: string, password: string): Promise<User> {
    const secret = JSON_WEB_SECRET_KEY ? JSON_WEB_SECRET_KEY : '';
    const user = await this.repository.findOne({ where: { username } });
    if (user) {
      throw new AuthenticationError('The given username is already present. Please choose a new username');
    }
    const token = jwt.sign({ username: username.toString() }, secret);
    
    const savedRow = await this.repository.save({
      username,
      token,
      password
    })

    return savedRow;
  }

  async logout(context: IContext): Promise<boolean> {
    if (!context || !context.user) {
      return Promise.reject("User not logged in")
    }
    return new Promise(async (res, rej) => {
      const { user } = context;
      try {
        await this.repository.update({
          id: user ? user.id : ""
        }, { token: "" });
        res(true);
      } catch (e) {
        rej(false);
      }
    });
  }
}