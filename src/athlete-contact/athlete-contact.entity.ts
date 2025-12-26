import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Athlete } from '../athlete/athlete.entity';

@Entity('AthleteContact')
export class AthleteContact {
  @PrimaryGeneratedColumn('uuid')
  pkAthleteContact: string;

  @Column('uuid')
  fkAthlete: string;

  @Column('text', { default: 'other' })
  contactType: string;

  @Column('text', { nullable: true })
  label: string;

  @Column('text')
  value: string;

  @Column('boolean', { default: false })
  isPrimary: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Athlete)
  @JoinColumn({ name: 'fkAthlete' })
  athlete: Athlete;
}