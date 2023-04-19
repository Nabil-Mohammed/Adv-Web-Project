import { IsNotEmpty, IsInt, Length } from "class-validator";

export class UserFormUpdate {   
    @IsNotEmpty({message: "Age must be fill up"})
    @Length(3,8)
    name: string;
    @IsNotEmpty({message: "Password must be fill up"})
    progress: string;
    @IsNotEmpty({message: "Age must be fill up"})
    @IsInt({message: "Invalid age"})
    id: number;
}