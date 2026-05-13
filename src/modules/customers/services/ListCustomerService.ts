import { Customer } from "../database/entities/Customer";
import { customerRepository } from "../database/repositories/CustomerRpositories";

export default class ListCustomerService {
  async execute(): Promise<Customer[]> {
    const customers = customerRepository.find();

    return customers;
  }
}
