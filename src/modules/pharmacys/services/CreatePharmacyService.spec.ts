import FakePharmacyRepository from '@modules/pharmacys/repositories/fakes/FakePharmacyRepository';
import FakeHashProvider from '@modules/pharmacys/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import CreatePharmacyService from './CreatePharmacyService';

let fakePharmacyRepository: FakePharmacyRepository;
let fakeHashProvider: FakeHashProvider;
let createPharmacyService: CreatePharmacyService;

describe('CreatePharmacyService', () => {
  beforeEach(() => {
    fakePharmacyRepository = new FakePharmacyRepository();
    fakeHashProvider = new FakeHashProvider();
    createPharmacyService = new CreatePharmacyService(
      fakePharmacyRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new pharmacy', async () => {
    const pharmacy = await createPharmacyService.execute({
      name: 'SpeedPharma',
      email: 'speedpharma@contact.com',
      password: '123456',
      whatsapp: 99999999,
      city: 'Dionísio Cerqueira',
      uf: 'SC',
      cnpj: 4734530,
      geolocation: [20.954392, -12.948043],
    });

    expect(pharmacy).toHaveProperty('id');
  });

  it('should not be able to create two pharmacy with the same email', async () => {
    await createPharmacyService.execute({
      name: 'SpeedPharma',
      email: 'speedpharma@contact.com',
      password: '123456',
      whatsapp: 99999999,
      city: 'Dionísio Cerqueira',
      uf: 'SC',
      cnpj: 198023,
      geolocation: [20.954392, -12.948043],
    });

    await expect(
      createPharmacyService.execute({
        name: 'SpeedPharma',
        email: 'speedpharma@contact.com',
        password: '123456',
        whatsapp: 99999999,
        city: 'Dionísio Cerqueira',
        uf: 'SC',
        cnpj: 100000,
        geolocation: [20.954392, -12.948043],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two pharmacy with the same cnpj', async () => {
    await createPharmacyService.execute({
      name: 'Pharma',
      email: 'pharma@contact.com',
      password: '123456',
      whatsapp: 99999999,
      city: 'Dionísio Cerqueira',
      uf: 'SC',
      cnpj: 100000,
      geolocation: [20.954392, -12.948043],
    });

    await expect(
      createPharmacyService.execute({
        name: 'SpeedPharma',
        email: 'speedpharma@contact.com',
        password: '123456',
        whatsapp: 99999999,
        city: 'Dionísio Cerqueira',
        uf: 'SC',
        cnpj: 100000,
        geolocation: [20.954392, -12.948043],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
