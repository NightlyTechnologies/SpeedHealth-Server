import { injectable, inject } from 'tsyringe';

import Pharmacy from '@modules/pharmacys/infra/typeorm/entities/Pharmacy';
import AppError from '@shared/errors/AppError';
import IUpdatePharmacyDTO from '../dtos/IUpdatePharmacyDTO';
import IPharmacysRepository from '../repositories/IPharmacysRepository';

@injectable()
class UpdatePharmacyService {
  constructor(
    @inject('PharmacysRepository')
    private pharmacysRepository: IPharmacysRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    whatsapp,
    city,
    uf,
    cnpj,
    geolocation,
  }: IUpdatePharmacyDTO): Promise<Pharmacy> {
    const emailUsed = await this.pharmacysRepository.findByEmail(email);

    if (emailUsed && emailUsed.id !== id) {
      throw new AppError('Email address already used.');
    }

    const cnpjUsed = await this.pharmacysRepository.findByCNPJ(cnpj);

    if (cnpjUsed && cnpjUsed.id !== id) {
      throw new AppError('Cnpj already registered');
    }

    try {
      const pharmacy = await this.pharmacysRepository.update({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
        cnpj,
        geolocation,
      });

      return pharmacy;
    } catch {
      throw new AppError('Invalid data to update');
    }
  }
}

export default UpdatePharmacyService;
