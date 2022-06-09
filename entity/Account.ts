
import { EntitySchema, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class account {

  @PrimaryGeneratedColumn()
  public name: string;

  @Column()
  public password: string;
}
