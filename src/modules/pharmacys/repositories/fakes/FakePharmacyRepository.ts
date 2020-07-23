import { uuid } from 'uuidv4';

import IPharmacysRepository from '@modules/pharmacys/repositories/IPharmacysRepository';
import ICreatePharmacyDTO from '@modules/pharmacys/dtos/ICreatePharmacyDTO';

import Pharmacy from '@modules/pharmacys/infra/typeorm/entities/Pharmacy';

class FakePharmacysRepository implements IPharmacysRepository {
  private pharmacys: Pharmacy[] = [];

  public async create({
    name,
    email,
    password,
    whatsapp,
    city,
    uf,
    cnpj,
    geolocation,
  }: ICreatePharmacyDTO): Promise<Pharmacy> {
    const pharmacy = new Pharmacy();

    Object.assign(pharmacy, {
      id: uuid(),
      name,
      email,
      password,
      whatsapp,
      city,
      uf,
      cnpj,
      geolocation,
    });

    this.pharmacys.push(pharmacy);

    return pharmacy;
  }

  public async findByEmail(email: string): Promise<Pharmacy | undefined> {
    const findPharmacy = this.pharmacys.find(
      (pharmacy) => pharmacy.email === email,
    );

    return findPharmacy;
  }

  public async findByCNPJ(cnpj: number): Promise<Pharmacy | undefined> {
    const findPharmacy = this.pharmacys.find(
      (pharmacy) => pharmacy.cnpj === cnpj,
    );

    return findPharmacy;
  }
}

export default FakePharmacysRepository;
