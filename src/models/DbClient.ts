import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './Client';

@Entity()
export class DbClient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nombre: string;

    @Column({ nullable: false })
    tipoDb: string;

    @Column({ nullable: false })
    host: string;

    @Column({ nullable: true })
    contrasena: string;

    @Column({ nullable: true })
    usuario_remoto: string;

    @ManyToOne(() => Client, client => client.fk_dbClient)
    clientId: Client;
}
