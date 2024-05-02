import { Like } from "typeorm";
import { Database } from "../configurations/data-source.config";
import { User, Image, RapBattle, Venue, Victory, Track } from "../entities";

const userRepository = Database.getRepository(User);
const imageRepository = Database.getRepository(Image);
const rapBattleRepository = Database.getRepository(RapBattle);
const venueRepository = Database.getRepository(Venue);
const victoryRepository = Database.getRepository(Victory);
const trackRepository = Database.getRepository(Track);
const likeRepository = Database.getRepository(Like);

export {
  imageRepository,
  rapBattleRepository,
  userRepository,
  venueRepository,
  victoryRepository,
};
