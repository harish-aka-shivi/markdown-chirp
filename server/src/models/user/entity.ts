import { Field, ID, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class User {
  @Field((of) => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;
}
