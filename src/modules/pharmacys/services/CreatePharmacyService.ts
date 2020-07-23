import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreatePharmacyDTO from '../dtos/ICreatePharmacyDTO';
import IPharmacysRepository from '../repositories/IPharmacysRepository';

import Pharmacy from '../infra/typeorm/entities/Pharmacy';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreatePharmacyService {
  constructor(
    @inject('PharmacysRepository')
    private pharmacysRepository: IPharmacysRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    whatsapp,
    city,
    uf,
    cnpj,
    geolocation,
  }: ICreatePharmacyDTO): Promise<Pharmacy> {
    const emailUsed = await this.pharmacysRepository.findByEmail(email);

    if (emailUsed) {
      throw new AppError('Email address already used.');
    }

    const cnpjUsed = await this.pharmacysRepository.findByCNPJ(cnpj);

    if (cnpjUsed) {
      throw new AppError('Cnpj already registered');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const pharmacy = await this.pharmacysRepository.create({
      name,
      email,
      password: hashedPassword,
      whatsapp,
      city,
      uf,
      cnpj,
      geolocation,
    });

    return pharmacy;
  }
}

export default CreatePharmacyService;
