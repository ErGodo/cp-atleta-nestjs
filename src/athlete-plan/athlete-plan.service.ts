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
        // 3. Crear el nuevo registro
        const idToSearch = Number(dto.planId || dto.idPlan);
        const planEntity = await this.planRepository.findOne({ where: { id: idToSearch } });
        if (!planEntity) {
            throw new Error(`Plan with ID ${idToSearch} not found`);
        }

        const newPlan = this.athletePlanRepository.create({
            fk_athlete: athleteId,
            plan: planEntity,
            fk_plan_id: planEntity.id,
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

        // Fallback: Si el join falló pero tenemos fk_plan_id, buscamos manual
        if (!planDetails && currentPlan.fk_plan_id) {
            console.log(`[getCurrentPlan] Join failed, fetching plan manually. fk_plan: ${currentPlan.fk_plan_id}`);
            planDetails = await this.planRepository.findOne({
                where: { id: currentPlan.fk_plan_id },
            });
        }

        if (!planDetails) {
            console.error(`[getCurrentPlan] Plan details not found for fk_plan: ${currentPlan.fk_plan_id}`);
            return {
                status: 'error',
                message: 'Plan definition not found in database.',
                debug_fk_plan: currentPlan.fk_plan_id
            };
        }

        // Calcular fecha de vencimiento
        const assignedAt = new Date(currentPlan.assignedAt);
        const expirationDate = new Date(assignedAt);

        const period = planDetails.billingPeriod?.toLowerCase();
        if (period === 'monthly') {
            expirationDate.setMonth(expirationDate.getMonth() + 1);
        } else if (period === 'yearly' || period === 'anual') {
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        } else {
            // Default 30 days if unknown
            expirationDate.setDate(expirationDate.getDate() + 30);
        }

        const now = new Date();
        const status = expirationDate > now ? 'active' : 'expired';

        return {
            planId: planDetails.id,
            planName: planDetails.name,
            price: Number(planDetails.price),
            currency: planDetails.currency,
            billingPeriod: planDetails.billingPeriod,
            status: status,
            assignedAt: assignedAt,
            expirationDate: expirationDate,
            daysRemaining: Math.ceil((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        };
    }

    async getHistory(athleteId: string): Promise<AthletePlan[]> {
        return await this.athletePlanRepository.find({
            where: { fk_athlete: athleteId },
            order: { assignedAt: 'DESC' },
        });
    }
}
