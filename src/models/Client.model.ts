import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from '../enums/UserRoles.enums';
import { DbClient } from './DbClient.model';

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nombre: string;

    @Column({ nullable: false })
    documento: string;

    @Column({ nullable: false })
    correo: string;

    @Column({ nullable: true })
    telefono: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: [UserRole.USER],
        nullable: false
    })
    rol: UserRole;
}
 