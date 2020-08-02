export default interface IUpdatePharmacyDTO {
  id: string;
  name: string;
  email: string;
  whatsapp: number;
  city: string;
  uf: string;
  cnpj: number;
  geolocation: [number, number];
}
