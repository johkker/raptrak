import { User } from "../../entities";
import { IUserRegister } from "../../interfaces";
import { GlobalError } from "../../errors";
import { userRepository } from "../../repositories";

const createUserSVC = async (data: IUserRegister) => {
  const { name, email, password, birthdate, document } = data;

  const existingUser = await userRepository.findOne({
    where: { email: email },
  });

  if (existingUser) {
    throw new GlobalError("E-mail already registered", 400);
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = password;
  user.birthdate = birthdate;
  user.document = document;

  userRepository.create(user);
  await userRepository.save(user);

  return {
    name: user.name,
    email: user.email,
    id: user.id,
  };
};

export default createUserSVC;
