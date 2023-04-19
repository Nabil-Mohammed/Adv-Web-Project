import { Module } from "@nestjs/common";
import { UserController } from "./user.controller"
import { UserService } from "./userservice.service"
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserEntity} from './userentity.entity';
import { PlannerService } from "src/planner/planner.service";
import { PlannerEntity } from "src/planner/planner.entity";
import { MailerModule } from "@nestjs-modules/mailer";
@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com',
                       port: 465,
                       ignoreTLS: true,
                       secure: true,
                       auth: {
                           user: 'snasir2194@gmail.com',
                           pass: 'yomprhdfnqmdkmnd'
                       },
                      }
          }),

          TypeOrmModule.forFeature([UserEntity, PlannerEntity])],
          controllers: [UserController],
          providers: [UserService,PlannerService],

})

export class UserModule {}