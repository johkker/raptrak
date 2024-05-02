import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Like } from "./likes.entity";
import { User } from "./users.entity";

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  plays: number;

  @OneToMany(() => Like, (like) => like.track)
  likes: Like[];

  @ManyToMany(() => User, (user) => user.tracks)
  artists: User[];
}
