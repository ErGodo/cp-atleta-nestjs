import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthletePlanController } from './athlete-plan.controller';
import { AthletePlan } from './athlete-plan.entity';
import { AthletePlanService } from './athlete-plan.service';

import { Plan } from './plan.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AthletePlan, Plan])],
    controllers: [AthletePlanController],
    providers: [AthletePlanService],
    exports: [AthletePlanService],
})
export class AthletePlanModule { }
