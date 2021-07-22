import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { DbClient } from './DbClient.model';

@Entity()
export class ConfigTablesClient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    tables: string;

    @OneToOne(() => DbClient, dbClient => dbClient.id)
    @JoinColumn()
    dbClient: DbClient;

}