import { injectable, inject } from 'tsyringe';

import ICreatePharmacyDTO from '../dtos/ICreatePharmacyDTO';
import IPharmacysRepository from '../repositories/IPharmacysRepository';

import Pharmacy from '../infra/typeorm/entities/Pharmacy';

@injectable()
class CreatePharmacyService {
  constructor(
    @inject('PharmacysRepository')
    private pharmacysRepository: IPharmacysRepository,
  ) {}

  public async execute(data: ICreatePharmacyDTO): Promise<Pharmacy> {
    const pharmacy = await this.pharmacysRepository.create(data);

    return pharmacy;
  }
}

export default CreatePharmacyService;
