import AppError from "@shared/errors/AppError";
import { customerMock } from "../domain/factories/customer.factory";
import FakeCustomerRepository from "../domain/repositories/fakes/FakeCustomerRepositories";
import CreateCustomerService from "./CreateCustomerServices";

  let fakeCustomerRepositories: FakeCustomerRepository;
  let createCustomer: CreateCustomerService;

describe('CreateCustomerService', () =>{
  beforeEach(() => {
  fakeCustomerRepositories = new FakeCustomerRepository();
  createCustomer = new CreateCustomerService(fakeCustomerRepositories);
  })

it('should be able to create a new customer', async () => {


  const customer = await createCustomer.execute(customerMock)

  expect(customer).toHaveProperty('id');
  expect(customer.name).toBe('Jonh Doe');
  expect(customer.email).toBe('jonh@gmail.com');
});

it('Should not able to create a new customer with email that is already in use', async () => {

  await createCustomer.execute(customerMock)
    await expect (createCustomer.execute(customerMock)
  ).rejects.toBeInstanceOf(AppError);
});
})
