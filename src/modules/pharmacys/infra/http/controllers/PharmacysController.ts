import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePharmacyService from '@modules/pharmacys/services/CreatePharmacyService';
import ListAllPharmacysService from '@modules/pharmacys/services/ListAllPharmacysService';
import UpdatePharmacyService from '@modules/pharmacys/services/UpdatePhamacyService';
import IUpdatePharmacyDTO from '@modules/pharmacys/dtos/IUpdatePharmacyDTO';

export default class PharmacyController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updatePharmacyService = container.resolve(UpdatePharmacyService);

    const { id } = request.pharmacy;

    const {
      name, email, whatsapp, city, uf, cnpj, geolocation,
    } = request.body;

    const data: IUpdatePharmacyDTO = {
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
      cnpj,
      geolocation,
    };

    const pharmacy = await updatePharmacyService.execute(data);

    return response.json(pharmacy);
  }

  public async index(_request: Request, response: Response): Promise<Response> {
    const listPharmacys = container.resolve(ListAllPharmacysService);

    const pharmacys = await listPharmacys.execute();

    return response.json(classToClass(pharmacys));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      whatsapp,
      city,
      uf,
      cnpj,
      geolocation,
    } = request.body;

    const pharmacyData = {
      name,
      email,
      password,
      whatsapp,
      city,
      uf,
      cnpj,
      geolocation,
    };

    const createPharmacy = container.resolve(CreatePharmacyService);

    const pharmacy = await createPharmacy.execute(pharmacyData);

    return response.json(classToClass(pharmacy));
  }
}
