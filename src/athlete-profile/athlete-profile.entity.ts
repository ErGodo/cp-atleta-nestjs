import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Athlete } from '../athlete/athlete.entity';

@Entity('AthleteProfile')
export class AthleteProfile {
  @PrimaryGeneratedColumn('uuid')
  pkAthleteProfile: string;

  @Column('uuid')
  fkAthlete: string;

  @Column('text', { nullable: true })
  displayName: string;

  @Column('text', { nullable: true })
  nationality: string;

  @Column('text', { nullable: true })
  idType: string;

  @Column('text', { nullable: true })
  idNumber: string;

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Athlete)
  @JoinColumn({ name: 'fkAthlete' })
  athlete: Athlete;
}