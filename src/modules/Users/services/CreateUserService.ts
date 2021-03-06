import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { User } from "../entities/User";
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  RA: string;
  isAdmin: boolean;
  image?: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }


  async execute({ name, email, password, RA, isAdmin, image }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('Email já cadastrado', 400);
    }

    const passwordHash = await hash(password, 8);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      RA,
      isAdmin,
      image
    });

    return newUser;
  }
}

