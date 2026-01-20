import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { AthletePlan } from './athlete-plan.entity';
import { AssignPlanDto } from './dto/assign-plan.dto';

@Injectable()
export class AthletePlanService {
    constructor(
        @InjectRepository(AthletePlan)
        private readonly athletePlanRepository: Repository<AthletePlan>,
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
        const currentPlan = await this.athletePlanRepository.findOne({
            where: {
                fk_athlete: athleteId,
                endDate: IsNull(),
            },
            relations: ['plan'],
        });

        if (!currentPlan || !currentPlan.plan) {
            return null;
        }

        return {
            planName: currentPlan.plan.name,
            price: Number(currentPlan.plan.price),
            currency: currentPlan.plan.currency,
            billingPeriod: currentPlan.plan.billingPeriod,
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
