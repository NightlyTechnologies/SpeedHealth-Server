import { injectable, inject } from 'tsyringe';
import IPharmacysRepository from '@modules/pharmacys/repositories/IPharmacysRepository';

@injectable()
class ListAllPharmacys {
  constructor(
    @inject('PharmacysRepository')
    private pharmacysRepository: IPharmacysRepository,
  ) {}

  public async execute() {
    const pharmacys = this.pharmacysRepository.findAll();

    return pharmacys;
  }
}

export default ListAllPharmacys;
