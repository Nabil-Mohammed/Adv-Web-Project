import { UserEntity } from 'src/user/userentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("planner")
export class PlannerEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.planners)
    user: UserEntity

    
}
