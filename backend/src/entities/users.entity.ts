import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Victory, Venue, Image, Like, Track, RapBattle } from './';
import { UserTypes } from '../enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique: true })
  document: string;

  @Column({ type: 'date', nullable: false })
  birthdate: Date;

  @Column('enum', {
    enum: UserTypes,
    array: true,
    default: [UserTypes.COMMON_USER]
  })
  types: UserTypes[];

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Victory, (victory) => victory.winner)
  victories: Victory[];

  @OneToMany(() => Venue, (venue) => venue.createdBy)
  createdVenues: Venue[];

  @OneToMany(() => Image, (image) => image.uploadedBy)
  images: Image[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @ManyToMany(() => Venue, (venue) => venue.owners)
  @JoinTable()
  ownedVenues: Venue[];

  @ManyToMany(() => Track, (track) => track.artists)
  @JoinTable()
  tracks: Track[];

  @ManyToMany(() => RapBattle, (rapBattle) => rapBattle.participants)
  rapBattles: RapBattle[];

  @ManyToMany(() => RapBattle, (rapBattle) => rapBattle.hosts)
  hostedRapBattles: RapBattle[];
}
