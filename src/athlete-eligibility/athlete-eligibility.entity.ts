import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Athlete } from '../athlete/athlete.entity';

@Entity('AthleteEligibility')
export class AthleteEligibility {
  @PrimaryGeneratedColumn('uuid')
  pkAthleteEligibility: string;

  @Column('uuid')
  fkAthlete: string;

  @Column('boolean', { default: false })
  isInjured: boolean;

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