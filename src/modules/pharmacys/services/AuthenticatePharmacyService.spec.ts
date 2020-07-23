import AppError from '@shared/errors/AppError';

import FakePharmacyRepository from '@modules/pharmacys/repositories/fakes/FakePharmacyRepository';
import FakeHashProvider from '@modules/pharmacys/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticatePharmacyService from '@modules/pharmacys/services/AuthenticatePharmacyService';

let fakePharmacyRepository: FakePharmacyRepository;
let fakeHashProvider: FakeHashProvider;
let authenticatePharmacy: AuthenticatePharmacyService;

describe('AuthenticatePharmacy', () => {
  beforeEach(() => {
    fakePharmacyRepository = new FakePharmacyRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticatePharmacy = new AuthenticatePharmacyService(
      fakePharmacyRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const pharmacy = await fakePharmacyRepository.create({
      name: 'SpeedPharma',
      email: 'speedpharma@contact.com',
      password: '123456',
      whatsapp: 99999999,
      city: 'Dionísio Cerqueira',
      uf: 'SC',
      cnpj: 4734530,
      geolocation: [20.954392, -12.948043],
    });

    const response = await authenticatePharmacy.execute({
      email: pharmacy.email,
      password: pharmacy.password,
    });

    expect(response).toHaveProperty('token');
    expect(response.pharmacy).toEqual(pharmacy);
  });

  it('should not be able to authenticate non existing user', async () => {
    await expect(
      authenticatePharmacy.execute({
        email: 'speedpharma@contact.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const pharmacy = await fakePharmacyRepository.create({
      name: 'SpeedPharma',
      email: 'speedpharma@contact.com',
      password: '123456',
      whatsapp: 99999999,
      city: 'Dionísio Cerqueira',
      uf: 'SC',
      cnpj: 4734530,
      geolocation: [20.954392, -12.948043],
    });

    await expect(
      authenticatePharmacy.execute({
        email: pharmacy.email,
        password: `${pharmacy.password}wrong`,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
