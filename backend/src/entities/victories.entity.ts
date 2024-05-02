import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User, RapBattle } from "./";

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
