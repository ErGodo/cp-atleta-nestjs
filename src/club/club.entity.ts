import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Club')
export class Club {
    @PrimaryGeneratedColumn('uuid')
    pkClub: string;

    @Column('text')
    name: string;

    @Column('text', { nullable: true })
    logoUrl: string;
}
