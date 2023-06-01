import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Victory, Venue, Image } from "./";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isRapper: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Victory, (victory) => victory.winner)
  victories: Victory[];

  @OneToMany(() => Venue, (venue) => venue.owner)
  venues: Venue[];

  @OneToMany(() => Image, (image) => image.uploadedBy)
  images: Image[];
}
