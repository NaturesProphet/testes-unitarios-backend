import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Log')
export class LogEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  atributos: any;
}
