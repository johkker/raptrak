import logger from '../../configurations/logger.config';
import { User } from '../../entities';
import { GlobalError } from '../../errors';
import { IUserRegister } from '../../interfaces';
import { userRepository } from '../../repositories';
const createUserSVC = async (data: IUserRegister) => {
  const { name, email, password, birthdate, document, types } = data;

  // Verificar se o e-mail ou documento já está registrado
  const existingEmail = await userRepository.findOne({
    where: [{ email: email }, { document: document }]
  });
  console.log('existing Email or existing document', existingEmail);
  if (existingEmail) {
    throw new GlobalError('E-mail or document already registered', 400);
  }

  // Criação de um novo usuário
  const user = new User();
  user.name = name;
  user.email = email;
  user.password = password;
  user.birthdate = birthdate;
  user.document = document;
  user.types = types;

  // Salvar o novo usuário no repositório
  userRepository.create(user);
  await userRepository.save(user);

  // Log de criação de usuário
  logger.info('User created successfully', {
    userId: user.id,
    email: user.email
  });

  return {
    name: user.name,
    email: user.email,
    id: user.id
  };
};

export default createUserSVC;
