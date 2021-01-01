import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Inject } from "typedi";
import { IContext } from "../interfaces/context";
import { User } from "../models/user/entity";
import { UserInputType } from "../models/user/userInputType";
import UserService from "../services/userService";

@Resolver()
export class UserResolver{

  @Inject()
  private User!: UserService;

  @Query(() => User, { nullable: true })
  async me(@Ctx() context: IContext): Promise<User | null> {
    if (!context || !context.user) return null
   return context.user;
 }
  
  @Mutation(() => User)
  login(@Arg('username') username: string, @Arg('password') password: string, @Ctx() context: IContext): Promise<User> {
    return this.User.login(username, password);
  }

  @Mutation(() => Boolean)
  logout(@Ctx() context: IContext): Promise<boolean> {
    return this.User.logout(context)
  }

  @Mutation(() => User)
  createUser(@Arg('username') username: string, @Arg('password') password: string): Promise<User> {
    return this.User.createUser(username, password);
  }
}