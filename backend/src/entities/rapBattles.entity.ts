import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Victory, Venue, User } from "./";

@Entity({ name: "rapBattles" })
export class RapBattle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gpsLocation: string;

  @Column()
  city: string;

  @Column({default: 0})
  likes: number;

  @OneToMany(() => Victory, (victory) => victory.rapBattle)
  victories: Victory[];

  @ManyToOne(() => Venue, (venue) => venue.rapBattles)
  venue: Venue;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @ManyToMany(() => User)
  @JoinTable()
  hosts: User[];
}
