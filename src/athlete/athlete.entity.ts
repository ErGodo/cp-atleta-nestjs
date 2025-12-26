import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('Athlete')
export class Athlete {
  @PrimaryGeneratedColumn('uuid')
  pkAthlete: string;

  @Column('uuid')
  fkClub: string;

  @Column('uuid', { nullable: true })
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

  // Relations (assuming Club and User entities exist)
  // @ManyToOne(() => Club)
  // @JoinColumn({ name: 'fkClub' })
  // club: Club;

  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'fkUser' })
  // user: User;
}