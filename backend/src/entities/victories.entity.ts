import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./users.entity";
import { RapBattle } from "./rapBattles.entity";

@Entity()
export class Victory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  winner: User;

  @ManyToOne(() => RapBattle)
  rapBattle: RapBattle;

  @Column()
  observation: string;

  @Column()
  date: Date;
}
