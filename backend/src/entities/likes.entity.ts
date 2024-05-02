import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User, Track, Venue } from "./";

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Track, (track) => track.likes)
  track: Track;

  @ManyToOne(() => Venue, (venue) => venue.likes)
  venue: Venue;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  likedAt: Date;
}
