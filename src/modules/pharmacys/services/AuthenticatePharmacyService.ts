import { sign } from 'jsonwebtoken';

import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import Pharmacy from '@modules/pharmacys/infra/typeorm/entities/Pharmacy';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/pharmacys/providers/HashProvider/models/IHashProvider';

import IPharmacysRepository from '../repositories/IPharmacysRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  pharmacy: Pharmacy;
  token: string;
}

@injectable()
class AuthenticatePharmacyService {
  constructor(
    @inject('PharmacysRepository')
    private pharmacysRepository: IPharmacysRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const pharmacy = await this.pharmacysRepository.findByEmail(email);

    if (!pharmacy) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      pharmacy.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: pharmacy.id,
      expiresIn,
    });

    return {
      pharmacy,
      token,
    };
  }
}

export default AuthenticatePharmacyService;
