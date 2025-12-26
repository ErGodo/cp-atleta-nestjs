import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthleteProfileService } from '../services/athlete-profile.service';
import { AthleteProfileController } from './athlete-profile.controller';
import { AthleteProfile } from './athlete-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AthleteProfile])],
  providers: [AthleteProfileService],
  controllers: [AthleteProfileController],
})
export class AthleteProfileModule {}