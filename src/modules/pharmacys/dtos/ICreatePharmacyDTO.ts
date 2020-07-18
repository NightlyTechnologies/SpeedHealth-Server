export default interface ICreatePharmacyDTO {
  name: string;
  email: string;
  password: string;
  whatsapp: number;
  city: string;
  uf: string;
  cnpj: number;
  geolocation: [number, number];
}
