// give me an Entity of venues, to match the context of my application:

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User, RapBattle } from "./";

@Entity()
export class Venue {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

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

  @ManyToOne(() => User, (user) => user.venues)
  owner: User;

  @OneToMany(() => RapBattle, (rapBattle) => rapBattle.venue)
  rapBattles: RapBattle[];
}
