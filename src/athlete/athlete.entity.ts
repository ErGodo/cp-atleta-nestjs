import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Club } from '../club/club.entity';

@Entity('Athlete')
export class Athlete {
  @PrimaryGeneratedColumn('uuid')
  pkAthlete: string;

  @ManyToOne(() => Club)
  @JoinColumn({ name: 'fkClub' })
  club: Club;

  @Column('uuid')
  fkClub: string;

  @Column('text', { nullable: true })
  fkUser: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('date', { nullable: true })
  birthDate: Date;

  @Column('text', { default: 'unspecified' })
  gender: string;

  @Column('text', { default: 'active' })
  athleteStatus: string;

  @Column('text', { nullable: true })
  photoUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}