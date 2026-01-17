import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('club_category')
export class ClubCategory {
    @PrimaryGeneratedColumn('uuid')
    pkCategory: string;

    @Column('text')
    name: string;

    @Column('text')
    type: string;

    @Column('text', { nullable: true })
    description: string;

    @Column('text', { nullable: true })
    gender: string;

    @Column('integer', { nullable: true })
    minAge: number;

    @Column('integer', { nullable: true })
    maxAge: number;

    @Column('uuid', { nullable: true })
    fkClub: string;

    @Column('boolean', { default: false, name: 'is_main' })
    isMain: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
