import { PartialType } from '@nestjs/mapped-types';
import { CreateAthleteClubCategoryDto } from './create-athlete-club-category.dto';

export class UpdateAthleteClubCategoryDto extends PartialType(CreateAthleteClubCategoryDto) { }
