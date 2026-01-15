import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Athlete } from '../athlete/athlete.entity';

@Entity('AthleteEligibility')
export class AthleteEligibility {
  @PrimaryGeneratedColumn('uuid')
  pkAthleteEligibility: string;

  @Column('uuid')
  fkAthlete: string;

  @Column('date', { nullable: true })
  medicalClearanceValidUntil: Date;

  @Column('date', { nullable: true })
  insuranceValidUntil: Date;

  @Column('boolean', { default: false })
  consentMedia: boolean;


  @Column('boolean', { default: true })
  consentDataProcessing: boolean;


  @Column('boolean', { default: false })
  isUnavailable: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Athlete)
  @JoinColumn({ name: 'fkAthlete' })
  athlete: Athlete;
}