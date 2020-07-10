import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('pharmacys')
class Pharmacy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  whatsapp: number;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  cnpj: number;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column('point')
  geolocation: [number, number];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pharmacy;
