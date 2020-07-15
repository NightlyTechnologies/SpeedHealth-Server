import { Request, Response } from 'express';
import Test from '@modules/pharmacys/services/Test';

const test = new Test();

export default class PharmacysController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const data = await test.execute(String(name));
    return response.json({ message: data });
  }
}
