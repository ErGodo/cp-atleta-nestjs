import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthleteService } from '../services/athlete.service';
import { AthleteController } from './athlete.controller';
import { Athlete } from './athlete.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Athlete])],
  providers: [AthleteService],
  controllers: [AthleteController],
})
export class AthleteModule {}