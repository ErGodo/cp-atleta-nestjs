import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AthleteClubCategory } from '../athlete-club-category/athlete-club-category.entity';
import { AthleteSportProfile } from '../athlete-sport-profile/athlete-sport-profile.entity';


@Entity('Athlete')
export class Athlete {
  @PrimaryGeneratedColumn('uuid')
  pkAthlete: string;



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

  @OneToMany(() => AthleteClubCategory, (acc) => acc.athlete)
  athleteClubCategories: AthleteClubCategory[];

  @OneToOne(() => AthleteSportProfile, (profile) => profile.athlete)
  sportProfile: AthleteSportProfile;

  @UpdateDateColumn()
  updatedAt: Date;
}