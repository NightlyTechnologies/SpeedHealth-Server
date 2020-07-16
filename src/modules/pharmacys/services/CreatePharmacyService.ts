import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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
    const emailUsed = await this.pharmacysRepository.findByEmail(data.email);

    if (emailUsed) {
      throw new AppError('Email address already used.');
    }

    const pharmacy = await this.pharmacysRepository.create(data);

    return pharmacy;
  }
}

export default CreatePharmacyService;
