import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany} from "typeorm";


@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column('integer',{nullable: true})
    createdBy?: number;

    @Column('text', {nullable: true})
    createdAt?: string;

    @Column('text', {nullable: true})
    title?: string;

    @Column('text', {nullable: true})
    eventType?: string;

    @Column('text', {nullable: true})
    description?: string;

    @Column('text', {nullable: true})
    eventDate?: string;

    @Column('text', {nullable: true})
    startTime?: string;

    @Column('text', {nullable: true})
    endTime?: string;

    @Column('text', {nullable: true})
    locationName?: string;

    @Column('text', {nullable: true})
    locationAddress?: string;

    @Column('text', {nullable: true})
    deadlineDate?: string;

}