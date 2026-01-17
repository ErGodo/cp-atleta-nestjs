import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Athlete } from '../athlete/athlete.entity';


@Entity('AthleteClubCategory')
export class AthleteClubCategory {
    @PrimaryGeneratedColumn('uuid')
    pkAthleteClubCategory: string;

    @ManyToOne(() => Athlete, (athlete) => athlete.athleteClubCategories)
    @JoinColumn({ name: 'fkAthlete' })
    athlete: Athlete;

    @Column('uuid')
    fkAthlete: string;

    @Column('uuid')
    fkClubCategory: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
