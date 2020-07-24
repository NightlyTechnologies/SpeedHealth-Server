import ICreatePharmacyDTO from '../dtos/ICreatePharmacyDTO';

import Pharmacy from '../infra/typeorm/entities/Pharmacy';

export default interface IPharmacysRepository {
  create(data: ICreatePharmacyDTO): Promise<Pharmacy>;
  findAll(): Promise<Pharmacy[]>;
  findByEmail(email: string): Promise<Pharmacy | undefined>;
  findByCNPJ(cnpj: number): Promise<Pharmacy | undefined>;
}
