import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Athlete, AthleteContact, AthleteEligibility, AthleteProfile, AthleteSportProfile],
        synchronize: true, // Set to false in production
      }),
      inject: [ConfigService],
    }),
    AthleteModule,
    AthleteContactModule,
    AthleteEligibilityModule,
    AthleteProfileModule,
    AthleteSportProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
