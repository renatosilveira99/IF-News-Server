import { User } from '../../entities/User';
import { ICreateUserDTO, IUpdateUserDTO, IUpdateUserImageDTO, IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async update({ name, email, RA, isAdmin, image }: IUpdateUserDTO): Promise<User> {
    let userToUpdateIndex = this.users.findIndex(foundUser => foundUser.email === email);

    this.users[userToUpdateIndex].name = name;
    this.users[userToUpdateIndex].email = email;
    this.users[userToUpdateIndex].RA = RA;
    this.users[userToUpdateIndex].isAdmin = isAdmin;
    this.users[userToUpdateIndex].image = image;

    return this.users[userToUpdateIndex];
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async create({ name, email, password, RA, isAdmin, image }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      RA,
      isAdmin,
      image
    });

    this.users.push(user);

    return user;
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    );

    this.users[findIndex] = user;
    return user;
  }
}
