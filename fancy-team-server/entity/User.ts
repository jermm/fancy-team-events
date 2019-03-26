import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, OneToOne} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column('text', {nullable: true})
    firstName?: string;

    @Column('text', {nullable: true})
    lastName?: string;

    @Column('text', {nullable: true})
    email?: string;

    @Column('text', {nullable: true})
    oAuthId?: string;

}