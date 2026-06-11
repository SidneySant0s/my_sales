import { Ipaginate } from "@shared/interfaces/pagination.interface";
import { customerRepository } from "../infra/database/repositories/CustomerRpositories";
import { Customer } from "../infra/database/entities/Customer";

export default class ListCustomerService {
  async execute(page: number = 1, limit: number = 10 ): Promise<Ipaginate<Customer>> {
    const [data, total] = await customerRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    const totalpages = Math.ceil(total /limit);

    return{
      data,
      total,
      per_page: limit,
      current_page: page,
      total_pages: totalpages,
      next_page: page < totalpages ? page + 1 :null,
      prev_page: page > 1 ? page - 1: null
    } as Ipaginate<Customer>;
  }
}
