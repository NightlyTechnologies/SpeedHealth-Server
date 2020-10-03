import FakePharmacysRepository from '@modules/pharmacys/repositories/fakes/FakePharmacyRepository';
import AppError from '@shared/errors/AppError';
import UpdatePharmacyService from '@modules/pharmacys/services/UpdatePhamacyService';
import ICreatePharmacyDTO from '@modules/pharmacys/dtos/ICreatePharmacyDTO';
import IUpdatePharmacyDTO from '@modules/pharmacys/dtos/IUpdatePharmacyDTO';

let fakePharmacyRepository: FakePharmacysRepository;
let updatePharmacyService: UpdatePharmacyService;

describe('UpdatePharmacyService', () => {
  beforeEach(() => {
    fakePharmacyRepository = new FakePharmacysRepository();
    updatePharmacyService = new UpdatePharmacyService(fakePharmacyRepository);
  });

  const initialPharmacy: ICreatePharmacyDTO = {
    name: 'SpeedPharma',
    email: 'speedpharma@gmail.com',
    password: '123456',
    whatsapp: 1111,
    city: 'Dionísio Cerqueira',
    uf: 'SC',
    cnpj: 10,
    geolocation: [10, -9],
  };

  it('should be able to change pharmacy email', async () => {
    const pharmacy = await fakePharmacyRepository.create(initialPharmacy);

    const newEmail = 'another@gmail.com';

    delete pharmacy.password;

    const updatedPharmacy = await updatePharmacyService.execute({
      ...pharmacy,
      email: newEmail,
    });

    expect(updatedPharmacy.email).toBe(newEmail);
    expect({ ...updatedPharmacy, email: pharmacy.email }).toEqual(pharmacy);
  });

  it('should not be able to change pharmacy email to an invalid email', async () => {
    const pharmacy = await fakePharmacyRepository.create(initialPharmacy);

    const newEmail = 'another@gmail.com';

    await fakePharmacyRepository.create({
      name: 'AnotherPharma',
      email: newEmail,
      password: '123456',
      whatsapp: 1111,
      city: 'Dionísio Cerqueira',
      uf: 'SC',
      cnpj: 20,
      geolocation: [10, -9],
    });

    delete pharmacy.password;

    expect(
      updatePharmacyService.execute({
        ...pharmacy,
        email: newEmail,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change pharmacy cnpj to an invalid cnpj', async () => {
    const pharmacy = await fakePharmacyRepository.create(initialPharmacy);

    const newCnpj = pharmacy.cnpj + 1;

    await fakePharmacyRepository.create({
      name: 'AnotherPharma',
      email: 'another@gmail.com',
      password: '123456',
      whatsapp: 1111,
      city: 'Dionísio Cerqueira',
      uf: 'SC',
      cnpj: newCnpj,
      geolocation: [10, -9],
    });

    delete pharmacy.password;

    expect(
      updatePharmacyService.execute({
        ...pharmacy,
        cnpj: newCnpj,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change pharmacy name', async () => {
    const pharmacy = await fakePharmacyRepository.create(initialPharmacy);

    const newName = 'AnotherName';

    delete pharmacy.password;

    const updatedPharmacy = await updatePharmacyService.execute({
      ...pharmacy,
      name: newName,
    });

    expect(updatedPharmacy.name).toBe(newName);
    expect({ ...updatedPharmacy, name: pharmacy.name }).toEqual(pharmacy);
  });

  it('should be able to change entirely data', async () => {
    const pharmacy = await fakePharmacyRepository.create(initialPharmacy);

    delete pharmacy.password;

    const newData: IUpdatePharmacyDTO = {
      id: pharmacy.id,
      name: 'AnotherName',
      email: 'another@gmail.com',
      whatsapp: 7777,
      city: 'Barracão',
      uf: 'PR',
      cnpj: 15,
      geolocation: [-87, 90],
    };

    const updatedPharmacy = await updatePharmacyService.execute(newData);

    expect(updatedPharmacy).toEqual(newData);
    expect({ ...updatedPharmacy, ...newData }).toEqual(pharmacy);
  });

  it('should be able to handle with database errors', async () => {
    jest.spyOn(fakePharmacyRepository, 'update').mockImplementationOnce(() => {
      throw new Error();
    });

    const pharmacy = await fakePharmacyRepository.create(initialPharmacy);

    delete pharmacy.password;

    expect(
      updatePharmacyService.execute({ ...pharmacy, cnpj: 1 }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
