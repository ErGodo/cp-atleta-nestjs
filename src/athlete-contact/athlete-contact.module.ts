import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthleteContactService } from '../services/athlete-contact.service';
import { AthleteContactController } from './athlete-contact.controller';
import { AthleteContact } from './athlete-contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AthleteContact])],
  providers: [AthleteContactService],
  controllers: [AthleteContactController],
})
export class AthleteContactModule {}