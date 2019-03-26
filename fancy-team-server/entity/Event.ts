import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany} from "typeorm";
import {User} from "./User";
import {UserEventStatus} from "./UserEventStatus";
import {Carpool} from "./Carpool";


@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable: true})
    @ManyToOne(() => User, (user: User) => user.events)
    createdBy?: User;

    @Column('text', {nullable: true})
    createdAt?: string;

    @Column('text', {nullable: true})
    title?: string;

    @Column('text', {nullable: true})
    type?: string;

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

    @Column({nullable: true})
    @OneToMany(() => UserEventStatus, (userEventStatus: UserEventStatus) => userEventStatus.event,  {
        cascade: true,
    })
    userEventStatuses?: UserEventStatus[];

    @Column({nullable: true})
    @ManyToMany(type => Carpool, carpool => carpool.event)
    @JoinTable()
    carpoolDrivers?: Carpool[];

}