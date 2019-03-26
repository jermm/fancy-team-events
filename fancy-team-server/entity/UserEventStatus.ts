import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";

@Entity()
export class UserEventStatus {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column("integer", {nullable: true})
    user?: number;

    @Column('integer', {nullable: true})
    event?: number;

    @Column('text', {nullable: true})
    email?: string;

    @Column('text', {nullable: true})
    roleType?: string;

    @Column({nullable: true})
    isAttending?: boolean;

    @Column({nullable: true})
    tShirtSize?: string;
}