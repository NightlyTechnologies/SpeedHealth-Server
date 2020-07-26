import FakePharmacysRepository from '../repositories/fakes/FakePharmacyRepository';
import ListAllPharmacys from './ListAllPharmacysService';

let fakePharmacyRepository: FakePharmacysRepository;
let listAllPharmacys: ListAllPharmacys;

describe('ListAllPharmacys', () => {
  beforeEach(() => {
    fakePharmacyRepository = new FakePharmacysRepository();
    listAllPharmacys = new ListAllPharmacys(fakePharmacyRepository);
  });

  it('should be able to list all pharmacys', async () => {
    const pharmacy1 = await fakePharmacyRepository.create({
      name: 'SpeedPharma1',
      email: 'speedpharma1@gmail.com',
      password: '123456',
      whatsapp: 99999999,
      city: 'Dionísio Cerqueira',
      uf: 'SC',
      cnpj: 1,
      geolocation: [10, -19],
    });

    const pharmacy2 = await fakePharmacyRepository.create({
      name: 'SpeedPharma2',
      email: 'speedpharma2@gmail.com',
      password: '123456',
      whatsapp: 99999999,
      city: 'Dionísio Cerqueira',
      uf: 'SC',
      cnpj: 2,
      geolocation: [10, -19],
    });

    const pharmacys = await listAllPharmacys.execute();

    expect(pharmacys).toEqual([pharmacy1, pharmacy2]);
  });
});
