import { getRepository, Repository } from 'typeorm';

import IPharmacysRepository from '@modules/pharmacys/repositories/IPharmacysRepository';
import ICreatePharmacyDTO from '@modules/pharmacys/dtos/ICreatePharmacyDTO';

import Pharmacy from '../entities/Pharmacy';

class PharmacysRepository implements IPharmacysRepository {
  private ormRepository: Repository<Pharmacy>;

  constructor() {
    this.ormRepository = getRepository(Pharmacy);
  }

  public async create(data: ICreatePharmacyDTO): Promise<Pharmacy> {
    const pharmacy = this.ormRepository.create(data);

    await this.ormRepository.save(pharmacy);

    return pharmacy;
  }

  public async findByEmail(email:string): Promise<Pharmacy | undefined> {
    const pharmacy = await this.ormRepository.findOne({
      where: { email },
    });

    return pharmacy;
  }

}

export default PharmacysRepository;
