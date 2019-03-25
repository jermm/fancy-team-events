import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany} from "typeorm";
import {User} from "./User";
import {UserEventStatus} from "./UserEventStatus";
import {Carpool} from "./Carpool";


@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user: User) => user.events)
    createdBy?: User;

    @Column()
    createdAt?: string;

    @Column()
    title?: string;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    eventDate: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column()
    locationName: string;

    @Column()
    locationAddress: string;

    @Column()
    deadlineDate: string;

    @OneToMany(() => UserEventStatus, (userEventStatus: UserEventStatus) => userEventStatus.event)
    userEventStatuses: UserEventStatus[]

    @ManyToMany(type => Carpool, carpool => carpool.event)
    @JoinTable()
    carpoolDrivers: Carpool[];

}