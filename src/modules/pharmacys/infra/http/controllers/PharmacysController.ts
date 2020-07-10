import { Request, Response } from 'express';

export default class PharmacysController {
  public async show(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'Hello World' });
  }
}
