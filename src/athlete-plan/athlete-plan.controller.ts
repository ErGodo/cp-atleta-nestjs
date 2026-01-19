import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AthletePlanService } from './athlete-plan.service';
import { AssignPlanDto } from './dto/assign-plan.dto';

@Controller('athletes')
export class AthletePlanController {
    constructor(private readonly athletePlanService: AthletePlanService) { }

    @Post(':athleteId/plans')
    assignPlan(
        @Param('athleteId') athleteId: string,
        @Body() assignPlanDto: AssignPlanDto
    ) {
        return this.athletePlanService.assignPlan(athleteId, assignPlanDto);
    }

    @Get(':athleteId/current-plan')
    getCurrentPlan(@Param('athleteId') athleteId: string) {
        return this.athletePlanService.getCurrentPlan(athleteId);
    }

    @Get(':athleteId/plans-history')
    getHistory(@Param('athleteId') athleteId: string) {
        return this.athletePlanService.getHistory(athleteId);
    }
}
