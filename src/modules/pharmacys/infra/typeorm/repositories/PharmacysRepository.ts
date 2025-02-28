import { getRepository, Repository } from 'typeorm';

import IPharmacysRepository from '@modules/pharmacys/repositories/IPharmacysRepository';
import ICreatePharmacyDTO from '@modules/pharmacys/dtos/ICreatePharmacyDTO';

import IUpdatePharmacyDTO from '@modules/pharmacys/dtos/IUpdatePharmacyDTO';
import Pharmacy from '../entities/Pharmacy';

class PharmacysRepository implements IPharmacysRepository {
  private ormRepository: Repository<Pharmacy>;

  constructor() {
    this.ormRepository = getRepository(Pharmacy, process.env.CONNECTION_NAME);
  }

  public async create(data: ICreatePharmacyDTO): Promise<Pharmacy> {
    const pharmacy = this.ormRepository.create(data);

    await this.ormRepository.save(pharmacy);

    return pharmacy;
  }

  public async update(pharma: IUpdatePharmacyDTO): Promise<Pharmacy> {
    let pharmacy = await this.ormRepository.findOne(pharma.id);

    if (!pharmacy) {
      throw new Error('Pharmacy not Found');
    }

    pharmacy = { ...pharmacy, ...pharma };

    await this.ormRepository.save(pharmacy);

    return pharmacy;
  }

  public async findAll(): Promise<Pharmacy[]> {
    const pharmacys = this.ormRepository.find();

    return pharmacys;
  }

  public async findById(id: string): Promise<Pharmacy | undefined> {
    const pharmacy = await this.ormRepository.findOne(id);

    return pharmacy;
  }

  public async findByEmail(email: string): Promise<Pharmacy | undefined> {
    const pharmacy = await this.ormRepository.findOne({
      where: { email },
    });

    return pharmacy;
  }

  public async findByCNPJ(cnpj: number): Promise<Pharmacy | undefined> {
    const pharmacy = await this.ormRepository.findOne({
      where: { cnpj },
    });

    return pharmacy;
  }
}

export default PharmacysRepository;
