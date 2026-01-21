import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Plan')
export class Plan {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    price: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    currency: string;

    @Column({ name: 'billingFrequency', type: 'varchar', length: 50, nullable: true })
    billingPeriod: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    type: string;

    @Column({ type: 'varchar', length: 50, default: 'active', nullable: true })
    status: string;

    @Column({ name: 'fk_club', type: 'int', nullable: true })
    fkClub: number;

    @Column({ type: 'text', nullable: true })
    features: string;
}
