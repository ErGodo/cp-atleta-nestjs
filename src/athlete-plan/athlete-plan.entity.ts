import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Plan } from './plan.entity';

@Entity('AthletePlans')
export class AthletePlan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    @Index()
    fk_athlete: string;

    @Column({ type: 'uuid', insert: false, update: false })
    fk_plan: string;

    @ManyToOne(() => Plan)
    @JoinColumn({ name: 'fk_plan' })
    plan: Plan;

    @CreateDateColumn({ name: 'assigned_at' })
    assignedAt: Date;

    @Column({ name: 'end_date', type: 'timestamp', nullable: true })
    endDate: Date | null;

    @Column('jsonb', { nullable: true })
    metadata: any;
}
