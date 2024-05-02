import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User, RapBattle, Like } from "./";

@Entity()
export class Venue {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  insta: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.createdVenues)
  createdBy: User;

  @ManyToMany(() => User, (user) => user.ownedVenues)
  owners: User[];

  @OneToMany(() => RapBattle, (rapBattle) => rapBattle.venue)
  rapBattles: RapBattle[];

  @OneToMany(() => Like, (like) => like.venue)
  likes: Like[];
}
