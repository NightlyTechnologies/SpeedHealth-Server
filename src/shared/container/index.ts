import { container } from 'tsyringe';

import IPharmacysRepository from '../../modules/pharmacys/repositories/IPharmacysRepository';
import PharmacysRepository from '../../modules/pharmacys/infra/typeorm/repositories/PharmacysRepository';
import '@modules/pharmacys/providers';

container.registerSingleton<IPharmacysRepository>(
  'PharmacysRepository',
  PharmacysRepository,
);
