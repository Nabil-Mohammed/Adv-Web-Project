import { Injectable } from "@nestjs/common";
import { UserForm } from "./userform.dto";
import { UserFormUpdate } from './userformupdate.dto';
import {UserEntity} from './userentity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userrepo: Repository<UserEntity>,
        private mailerService: MailerService) {}

getIndex():string { 
    return "User Index"; 

}
getPlannerByID(id: number):any {
    
        return this.userrepo.find({ 
          where: {id:id}
    });
   
}
getPlannerByName(name): any
{
  return this.userrepo.find({ 
    where: {name:name},
  })
}

getPlannerByIDName():any {
    return this.userrepo.find();
    
}


insertPlan(mydto:UserForm):any {
    
    return this.userrepo.save(mydto);
  }

  updateMeal(mydto:UserForm,id): any
  {
    return this.userrepo.update(id,mydto);
  }

  updateUser(name,email):any {
   
    return this.userrepo.update({email:email},{name:name});
    }
updateExercisebyid(name,id):any {
        return "Update  where id " +id+" and change name to " +name;
    }

    deleteMeal(id): any 
  {
    return this.userrepo.delete(id);
  }
    /*
    RemovePlannerbyid(id):any {
    
        return "Delete id is"+id;
    }
    */
    RequestPlannerbyid(id):any {
        return "Planner id is"+id;
    }
    
    DoReporting(mydto:UserForm):any {
    
        return "Report progress: " + mydto.progress;
    }
    
   GiveEmail(mydto:UserForm):any {
    
        return "Email ID: " + mydto.email;
    }
    getPlannerAdvice(id):any {
    
        return "the id is "+id;
    }
    SetGoal(mydto:UserForm):any {
    
        return "Set Goal: " + mydto.Goal;
    }
    TrackFoodIntake(mydto:UserForm):any {
    
        return "types of food " + mydto.food+"num of food"+ mydto.num;
    }




//////////////////////////////////////////////////////////////////////////////////


    getPlannersByUserID(id):any {
      return this.userrepo.find({ 
              where: {id:id},
          relations: {
              planners: true,
          },
       });
  }


  async signup(mydto) {
    
    const salt = await bcrypt.genSalt(10);
    //const salt = '$2b$10$1234567890123456789012';
    const hassedpassword= await bcrypt.hash(mydto.food, salt);
    mydto.food= hassedpassword;
    return this.userrepo.save(mydto);
    }


    async signin(mydto){
      console.log(mydto.food);
  const mydata= await this.userrepo.findOneBy({email: mydto.email});
  const isMatch= await bcrypt.compare(mydto.food, mydata.food);
  if(isMatch) {
  return 1;
  }
  else {
      return 0;
  }
   
  }

  async sendEmail(mydata){
    return await this.mailerService.sendMail({
           to: mydata.email,
           subject: mydata.subject,
           text: mydata.text, 
         });
   
   }

}


