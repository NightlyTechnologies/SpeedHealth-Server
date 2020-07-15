import FakePharmacyRepository from '@modules/pharmacys/repositories/fakes/FakePharmacyRepository';

import CreatePharmacyService from './CreatePharmacyService';

let fakePharmacyRepository: FakePharmacyRepository;
let createPharmacyService: CreatePharmacyService;

describe('CreatePharmacyService', () => {
  beforeEach(() => {
    fakePharmacyRepository = new FakePharmacyRepository();
    createPharmacyService = new CreatePharmacyService(fakePharmacyRepository);
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
});
