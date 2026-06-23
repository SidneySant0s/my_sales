import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomerRepositories";
import customersRepository from "@modules/customers/infra/database/repositories/CustomerRepositories";
import { container } from "tsyringe";

container.registerSingleton<ICustomersRepository>(
   'CustomersRepository',
   customersRepository,
)
