import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Victory, Venue } from "./";

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
}
