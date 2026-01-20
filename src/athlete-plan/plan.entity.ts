import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Plans')
export class Plan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('numeric')
    price: number;

    @Column('text')
    currency: string;

    @Column('text', { name: 'billing_period' })
    billingPeriod: string;

    @Column('text', { default: 'active' })
    status: string;
}
