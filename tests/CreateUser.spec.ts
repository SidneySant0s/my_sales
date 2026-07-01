/* eslint-disable @typescript-eslint/no-unused-vars */
import { App } from "supertest/types";
import { AppDataSource } from "../src/shared/infra/typeorm/data-source";
import appPromise from '../src/shared/infra/http/server';
import  request  from "supertest";
describe('Create User', () => {
  let app: App;

  beforeAll(async () => {
    await AppDataSource.initialize();
    app = (await appPromise) as App;
  });

  afterAll( async () => {
    const entities = AppDataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    }
    await AppDataSource.destroy();
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Jonh Doe',
      email: 'jonhe@example.com',
      password: '123456',
    })

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('jonhdoe@example.com');
  })
})
