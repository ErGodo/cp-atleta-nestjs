import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthletePlanController } from './athlete-plan.controller';
import { AthletePlan } from './athlete-plan.entity';
import { AthletePlanService } from './athlete-plan.service';

@Module({
    imports: [TypeOrmModule.forFeature([AthletePlan])],
    controllers: [AthletePlanController],
    providers: [AthletePlanService],
    exports: [AthletePlanService],
})
export class AthletePlanModule { }
