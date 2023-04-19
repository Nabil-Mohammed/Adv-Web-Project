
import { PlannerEntity } from 'src/planner/planner.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("user")
export class UserEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  span: number;

  @Column()
  num: number; 

  @Column()
  progress: string;

  @Column()
  Goal: string;

   @Column()
  name: string;

   @Column()
  food: string;

  @Column()
  email: string;


  @Column()
  filename: string;

  @OneToMany(() => PlannerEntity, (planner) => planner.user)
  planners: PlannerEntity[]

    
}