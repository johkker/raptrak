import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Victory } from "./victories.entity";

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

  @Column()
  likes: number;

  @OneToMany(() => Victory, (victory) => victory.rapBattle)
  victories: Victory[];
}
