import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlannerEntity } from "./planner.entity";



@Module({
imports: [TypeOrmModule.forFeature([PlannerEntity])],
controllers: [],
providers: [],

})


export class PlannerModule {}