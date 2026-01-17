import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAthleteClubCategoryDto {
    @IsNotEmpty()
    @IsUUID()
    fkAthlete: string;

    @IsNotEmpty()
    @IsUUID()
    fkClubCategory: string;
}
