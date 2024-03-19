import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Victory, Venue, Image } from "./";
import { Gender } from "../enums";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  document: string;

  @Column({ type: "date", nullable: false })
  birthdate: Date;

  @Column({ default: false })
  isRapper: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Victory, (victory) => victory.winner)
  victories: Victory[];

  @OneToMany(() => Venue, (venue) => venue.createdBy)
  createdVenues: Venue[];

  @ManyToMany(() => Venue, (venue) => venue.owners)
  ownedVenues: Venue[];

  @OneToMany(() => Image, (image) => image.uploadedBy)
  images: Image[];
}
