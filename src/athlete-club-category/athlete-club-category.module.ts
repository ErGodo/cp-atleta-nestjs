import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Athlete } from '../athlete/athlete.entity';
import { AthleteClubCategoryController } from './athlete-club-category.controller';
import { AthleteClubCategory } from './athlete-club-category.entity';
import { AthleteClubCategoryService } from './athlete-club-category.service';

import { ClubCategory } from './club-category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AthleteClubCategory, Athlete, ClubCategory])],
    controllers: [AthleteClubCategoryController],
    providers: [AthleteClubCategoryService],
    exports: [AthleteClubCategoryService],
})
export class AthleteClubCategoryModule { }
