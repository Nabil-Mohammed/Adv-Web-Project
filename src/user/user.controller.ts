import { Body, UseGuards, Session, UseInterceptors,MaxFileSizeValidator ,UploadedFile,ParseFilePipe, FileTypeValidator,Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, Request, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserForm } from "./userform.dto";
import { UserService } from "./userservice.service";
import { UserFormUpdate } from './userformupdate.dto';
import { PlannerForm } from 'src/planner/planner.dto';
import { PlannerService } from 'src/planner/planner.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SessionGuard } from './session.guard';
import { UnauthorizedException } from '@nestjs/common/exceptions';
@Controller("/user")
export class UserController
{ 
  constructor(private userService: UserService, private plannerService: PlannerService){}

  @Get("/index")
    getUser(): any { 
        return this.userService.getIndex();
    }
    
    @Get("/findplanner1/:id")
    getPlannerByID(@Param("id", ParseIntPipe) id:number,): any {
      return this.userService.getPlannerByID(id);
    }
   
    @Get('/findplannerbyname/:name')
    getPlannerByName(@Param('name') name: String): any {
      return this.userService.getPlannerByName(name);
    }
/*
    @Get("/findplanner")
    getPlannerByIDName(@Query() qry:any): any {
      return this.userService.getPlannerByIDName();
    }
    */  
    @Post('/insertplan')
    insertPlan(@Body() ndto: UserForm): any 
    {
      return this.userService.insertPlan(ndto);
    }

    @Put('/updateuser/:id')
    updateMeal(
      @Body() mydto: UserForm,
      @Param('id', ParseIntPipe) id: number,
    ): any {
      return this.userService.updateMeal(mydto, id);
    }


    
    @Put("/updateuser1")
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateUser( 
      @Session() session,@Body('name') name: string): any {
        console.log(session.email);
        return this.userService.updateUser(name, session.email);
      }
    
    
    @Put("/updateuser2/:id")
  updateUserbyid( 
      @Body("name") name:string, 
      @Param("id", ParseIntPipe) id:number
      ): any {
    return this.userService.updateExercisebyid(name,id);
    }

    @Delete('/deletemeal/:id')
    deleteMeal(@Param('id', ParseIntPipe) id: number): any {
        return this.userService.deleteMeal(id);
  
    }
/*
    @Delete("/removeplanner/:id")
  RemovePlannerbyid( 
     @Param("id", ParseIntPipe) id:number
      ): any {
    return this.userService.RemovePlannerbyid(id);
    }
*/
    @Get("/findplanner3/:id")
    RequestPlannerbyid(@Param("id", ParseIntPipe) id:number,): any {
      return this.userService.RequestPlannerbyid(id);
    }

    @Post("/insertuser2")
    @UsePipes(new ValidationPipe())
    DoReporting(@Body() mydto:UserForm): any {
      return this.userService.DoReporting(mydto);
    }

    @Post("/insertuser3")
    @UsePipes(new ValidationPipe())
    GiveEmail(@Body() mydto:UserForm): any {
      return this.userService.GiveEmail(mydto);
    }

    @Get("/findplanner4/:id")
    getPlannerAdvice(@Param("id", ParseIntPipe) id:number,): any {
      return this.userService.getPlannerAdvice(id);
    }
    @Post("/insertuser3")
    @UsePipes(new ValidationPipe())
    SetGoal(@Body() mydto:UserForm): any {
      return this.userService.SetGoal(mydto);
    }
    @Post("/insertuser4")
    @UsePipes(new ValidationPipe())
    TrackFoodIntake(@Body() mydto:UserForm): any {
      return this.userService.TrackFoodIntake(mydto);
    }

    @Post('/insertplanner')
    @UsePipes(new ValidationPipe())
      insertPlanner(@Body() plannerdto: PlannerForm): any {
        return this.plannerService.insertPlanner(plannerdto);
      }



      @Get('/findplannersbyuserid/:id')
      getPlannerByUserID(@Param('id', ParseIntPipe) id: number): any {
        return this.userService.getPlannersByUserID(id);
      }
      
  
      @Get('/finduserbyplannerid/:id')
      getUserByplannerID(@Param('id', ParseIntPipe) id: number): any {
        return this.plannerService.getUserByPlannerID(id); 
      }

    
 @Post('/signup')
@UseInterceptors(FileInterceptor('myfile',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})
}))
signup(@Body() mydto:UserForm,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 16000 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.filename;  

return this.userService.signup(mydto);
console.log(file)
}

@Get('/signin')
signin(@Session() session, @Body() mydto:UserForm)
{
if(this.userService.signin(mydto))
{
  session.email = mydto.email;

  console.log(session.email);
  return {message:"success"};

}
else
{
  return {message:"invalid credentials"};
}
  
}

@Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}

@Post('/sendemail')
sendEmail(@Body() mydata){
return this.userService.sendEmail(mydata);
}

}