import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class PlannerForm {   
   

   @IsNotEmpty()
    name: string;
   
   @IsEmail() 
    email: string;

    @Length(3,8)
    password: string;

 
    address: string;

   // plannerid:number;



}