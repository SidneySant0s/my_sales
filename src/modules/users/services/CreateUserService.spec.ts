/* eslint-disable @typescript-eslint/no-require-imports */
import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../domain/repositories/fakes/FakeUserRepositories';
import CreateSessionsService from './CreateSessionService';
//import { User } from '../infra/database/entities/User';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'fake-token'),
}));

let fakeUserRepository: FakeUserRepository;
let createSessionsService: CreateSessionsService;

describe('CreateSessionsService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createSessionsService = new CreateSessionsService(fakeUserRepository);
  });

it('should be able to authenticate with valid credentials', async () => {
  await fakeUserRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'hashed-password',
  });

  (require('bcrypt').compare as jest.Mock).mockResolvedValue(true);

  const response = await createSessionsService.execute({
    email: 'johndoe@example.com',
    password: 'hashed-password',
  });

  expect(response).toHaveProperty('token');
  expect(response.user.email).toBe('johndoe@example.com');
});

it('should not be able to authenticate with wrong password', async () => {
  await fakeUserRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'hashed-password',
  });

  (require('bcrypt').compare as jest.Mock).mockResolvedValue(false);

  await expect(
    createSessionsService.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password',
    }),
  ).rejects.toBeInstanceOf(AppError);
});
});
