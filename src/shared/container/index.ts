import { container } from 'tsyringe';

import '@modules/pharmacys/providers';

import IPharmacysRepository from '@modules/pharmacys/repositories/IPharmacysRepository';
import PharmacysRepository from '@modules/pharmacys/infra/typeorm/repositories/PharmacysRepository';

container.registerSingleton<IPharmacysRepository>(
  'PharmacysRepository',
  PharmacysRepository,
);
