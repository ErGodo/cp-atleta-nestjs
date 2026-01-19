import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class AssignPlanDto {
    @IsNotEmpty()
    @IsUUID()
    planId: string;

    @IsOptional()
    metadata?: any;
}
