import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class AssignPlanDto {
    @IsNotEmpty()
    // Removed @IsUUID() to support Integer IDs from existing database
    planId: number | string;

    @IsOptional()
    metadata?: any;
}
