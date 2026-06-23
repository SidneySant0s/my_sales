import AppError from "@shared/errors/AppError";
import { ICustomersRepository } from "../domain/repositories/ICustomerRepositories";

interface IDeleteCustomer {
  id: number;
}

export default class DeleteCustomerService {
  constructor(private readonly customerRepository: ICustomersRepository){}
  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404)
    }

    await this.customerRepository.remove(customer);
  }
}
