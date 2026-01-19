import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('AthletePlans')
export class AthletePlan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    @Index()
    fk_athlete: string;

    @Column('uuid')
    fk_plan: string;

    @CreateDateColumn({ name: 'assigned_at' })
    assignedAt: Date;

    @Column({ name: 'end_date', type: 'timestamp', nullable: true })
    endDate: Date | null;

    @Column('jsonb', { nullable: true })
    metadata: any;
}
