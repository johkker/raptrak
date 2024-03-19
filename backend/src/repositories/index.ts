import { Database } from "../configurations/data-source.config";
import { User, Image, RapBattle, Venue, Victory } from "../entities";

const userRepository = Database.getRepository(User)
const imageRepository = Database.getRepository(Image)
const rapBattleRepository = Database.getRepository(RapBattle)
const venueRepository = Database.getRepository(Venue)
const victoryRepository = Database.getRepository(Victory)

export { imageRepository, rapBattleRepository, userRepository, venueRepository, victoryRepository }