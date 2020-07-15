import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePharmacyService from '@modules/pharmacys/services/CreatePharmacyService';

export default class PharmacyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      whatsapp,
      city,
      uf,
      cnpj,
      latitude,
      longitude,
    } = request.body;

    const pharmacyData = {
      name,
      email,
      password,
      whatsapp,
      city,
      uf,
      cnpj,
      latitude,
      longitude,
    };

    const createPharmacy = container.resolve(CreatePharmacyService);

    const data = await createPharmacy.execute(pharmacyData);

    return response.json(data);
  }
}
