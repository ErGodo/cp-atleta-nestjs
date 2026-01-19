import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AthleteClubCategory } from './athlete-club-category/athlete-club-category.entity';
import { AthleteClubCategoryModule } from './athlete-club-category/athlete-club-category.module';
import { AthleteContact } from './athlete-contact/athlete-contact.entity';
import { AthleteContactModule } from './athlete-contact/athlete-contact.module';
import { AthleteEligibility } from './athlete-eligibility/athlete-eligibility.entity';
import { AthleteEligibilityModule } from './athlete-eligibility/athlete-eligibility.module';
import { AthleteProfile } from './athlete-profile/athlete-profile.entity';
import { AthleteProfileModule } from './athlete-profile/athlete-profile.module';
import { AthleteSportProfile } from './athlete-sport-profile/athlete-sport-profile.entity';
import { AthleteSportProfileModule } from './athlete-sport-profile/athlete-sport-profile.module';
import { Athlete } from './athlete/athlete.entity';
import { AthleteModule } from './athlete/athlete.module';

import { AthletePlanModule } from './athlete-plan/athlete-plan.module';

import { FirebaseModule } from './firebase/firebase.module';

import { ClubCategory } from './athlete-club-category/club-category.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT!, 10),
        username: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_DATABASE!,
        entities: [Athlete, AthleteContact, AthleteEligibility, AthleteProfile, AthleteSportProfile, AthleteClubCategory, ClubCategory, AthletePlan],
        synchronize: false, // Set to false for manual schema control
      }),
    }),
    AthleteModule,
    AthleteContactModule,
    AthleteEligibilityModule,
    AthleteProfileModule,
    AthleteSportProfileModule,
    AthleteClubCategoryModule,
    AthletePlanModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
