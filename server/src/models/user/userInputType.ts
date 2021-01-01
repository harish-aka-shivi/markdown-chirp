import { Field, InputType } from "type-graphql"

@InputType()
export class UserInputType {
  @Field()
  username!: string

  @Field()
  password!: string
}
