import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthleteEligibilityService } from '../services/athlete-eligibility.service';
import { AthleteEligibilityController } from './athlete-eligibility.controller';
import { AthleteEligibility } from './athlete-eligibility.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AthleteEligibility])],
  providers: [AthleteEligibilityService],
  controllers: [AthleteEligibilityController],
})
export class AthleteEligibilityModule {}