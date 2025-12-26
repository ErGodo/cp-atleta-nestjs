import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthleteSportProfileService } from '../services/athlete-sport-profile.service';
import { AthleteSportProfileController } from './athlete-sport-profile.controller';
import { AthleteSportProfile } from './athlete-sport-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AthleteSportProfile])],
  providers: [AthleteSportProfileService],
  controllers: [AthleteSportProfileController],
})
export class AthleteSportProfileModule {}