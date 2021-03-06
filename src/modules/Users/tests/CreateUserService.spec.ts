import AppError from '../../../utils/AppError';
import { UsersRepositoryInMemory } from '../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserService } from '../services/CreateUserService';

let createUserService: CreateUserService;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(
      usersRepositoryInMemory
    );
  });

  it('should be able to create a new user', async () => {
    const user = {
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false,
      image: 'fake-image'
    };

    await createUserService.execute(user);

    const userCreated = await usersRepositoryInMemory.findByEmail(
      user.email
    );

    expect(userCreated).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existent email', async () => {
    const user = {
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false,
      image: 'fake-image'
    };

    await createUserService.execute(user);

    await expect(
      createUserService.execute(user)
    ).rejects.toBeInstanceOf(AppError);
  });
});
