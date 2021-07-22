import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Client } from './Client.model';

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

    @Column({ nullable: false })
    contrasena: string;

    @Column({ nullable: false })
    usuario_remoto: string;

    @Column({ nullable: false })
    puerto: number;

    @ManyToOne(() => Client, client => client.id)
    @JoinColumn()
    client: Client;

}
