import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticatePharmacyService from '@modules/pharmacys/services/AuthenticatePharmacyService';
import { classToClass } from 'class-transformer';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticatePharmacy = container.resolve(AuthenticatePharmacyService);

    const { pharmacy, token } = await authenticatePharmacy.execute({
      email,
      password,
    });

    return response.json({ pharmacy: classToClass(pharmacy), token });
  }
}
