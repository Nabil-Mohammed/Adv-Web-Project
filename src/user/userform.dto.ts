import { IsNotEmpty, IsInt, Length, IsEmail, IsString } from "class-validator";

export class UserForm {   
   

    @IsInt({message: "Invalid span"})
    @IsNotEmpty()
    span: number;

    @IsInt({message: "Invalid num"})
    @IsNotEmpty()
    num: number; 

    @IsNotEmpty()
    @IsString()
    progress: string;

    @IsNotEmpty() 
    Goal: string;
    
     
    @IsNotEmpty()
    name: string;
 
    @IsNotEmpty()
    food: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsNotEmpty()
    filename: string;

}
