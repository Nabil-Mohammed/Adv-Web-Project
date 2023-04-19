import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlannerForm } from "./planner.dto";
import { PlannerEntity } from "./planner.entity";
//import { UserEntity } from "./userentity.entity";


@Injectable()
export class PlannerService {
    constructor(
        @InjectRepository(PlannerEntity)
        private plannerRepo: Repository<PlannerEntity>,
        
      ) {}


insertPlanner(mydto:PlannerForm):any {
    
   return this.plannerRepo.save(mydto);
      }

      getUserByPlannerID(id):any {
        return this.plannerRepo.find({ 
                where: {id:id},
            relations: {
                user: true,
            },
         });
    }
    

}