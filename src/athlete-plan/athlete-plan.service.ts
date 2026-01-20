import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { AthletePlan } from './athlete-plan.entity';
import { AssignPlanDto } from './dto/assign-plan.dto';

import { Plan } from './plan.entity';

@Injectable()
export class AthletePlanService {
    constructor(
        @InjectRepository(AthletePlan)
        private readonly athletePlanRepository: Repository<AthletePlan>,
        @InjectRepository(Plan)
        private readonly planRepository: Repository<Plan>,
    ) { }

    async assignPlan(athleteId: string, dto: AssignPlanDto): Promise<AthletePlan> {
        // 1. Buscar si el atleta ya tiene un plan activo (end_date IS NULL)
        const currentPlan = await this.athletePlanRepository.findOne({
            where: {
                fk_athlete: athleteId,
                endDate: IsNull(),
            },
        });

        // 2. Si tiene uno, cerrarlo
        if (currentPlan) {
            currentPlan.endDate = new Date();
            await this.athletePlanRepository.save(currentPlan);
        }

        // 3. Crear el nuevo registro
        const newPlan = this.athletePlanRepository.create({
            fk_athlete: athleteId,
            fk_plan: dto.planId,
            metadata: dto.metadata,
            endDate: null,
            // assignedAt se llena automáticamente por @CreateDateColumn
        });

        return await this.athletePlanRepository.save(newPlan);
    }

    async getCurrentPlan(athleteId: string): Promise<any> {
        console.log(`[getCurrentPlan] Fetching plan for athlete: ${athleteId}`);
        const currentPlan = await this.athletePlanRepository.findOne({
            where: {
                fk_athlete: athleteId,
                endDate: IsNull(),
            },
            relations: ['plan'],
        });

        if (!currentPlan) {
            console.log(`[getCurrentPlan] No active plan found in AthletePlans for athlete: ${athleteId}`);
            return {
                status: 'no-active-plan',
                message: 'No active plan assigned to this athlete.',
            };
        }

        let planDetails: Plan | null = currentPlan.plan;

        // Fallback: Si el join falló pero tenemos fk_plan, buscamos manual
        if (!planDetails && currentPlan.fk_plan) {
            console.log(`[getCurrentPlan] Join failed, fetching plan manually. fk_plan: ${currentPlan.fk_plan}`);
            planDetails = await this.planRepository.findOne({
                where: { id: currentPlan.fk_plan },
            });
        }

        if (!planDetails) {
            console.error(`[getCurrentPlan] Plan details not found for fk_plan: ${currentPlan.fk_plan}`);
            return {
                status: 'error',
                message: 'Plan definition not found in database.',
                debug_fk_plan: currentPlan.fk_plan
            };
        }

        return {
            planName: planDetails.name,
            price: Number(planDetails.price),
            currency: planDetails.currency,
            billingPeriod: planDetails.billingPeriod,
            status: 'active',
        };
    }

    async getHistory(athleteId: string): Promise<AthletePlan[]> {
        return await this.athletePlanRepository.find({
            where: { fk_athlete: athleteId },
            order: { assignedAt: 'DESC' },
        });
    }
}
