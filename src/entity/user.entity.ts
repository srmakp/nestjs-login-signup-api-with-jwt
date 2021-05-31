import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email', 'phone'])
export class SignUpUser {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ unique: true })
  phone: string;
}
