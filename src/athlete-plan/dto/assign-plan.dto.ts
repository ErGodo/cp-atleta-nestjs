import { IsNotEmpty, IsOptional } from 'class-validator';

export class AssignPlanDto {
    @IsNotEmpty()
    // Removed @IsUUID() to support Integer IDs from existing database
    planId: number | string;

    @IsOptional()
    idPlan?: number | string; // Support alternative field name from payload

    @IsOptional()
    metadata?: any;
}
