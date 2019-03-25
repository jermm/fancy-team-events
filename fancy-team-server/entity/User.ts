import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, OneToOne} from "typeorm";
import {Event} from "./Event";
import {UserEventStatus} from "./UserEventStatus";
import {Carpool} from "./Carpool";
import {CarpoolPassenger} from "./CarpoolPassenger";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName?: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    oAuthId: string;

    @OneToMany(() => Carpool, carpool => carpool.driver)
    carpools: Carpool[];

    @OneToMany(() => Event, (event: Event) => event.createdBy)
    events: Event[];

    @OneToMany(() => UserEventStatus, (userEventStatus: UserEventStatus) => userEventStatus.user)
    userEventStatuses: UserEventStatus[];

    @OneToMany(() => CarpoolPassenger, (carpoolPassenger: CarpoolPassenger) => carpoolPassenger.user)
    carpoolPassengers: CarpoolPassenger[]

}