import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, OneToOne} from "typeorm";
import {Event} from "./Event";
import {UserEventStatus} from "./UserEventStatus";
import {Carpool} from "./Carpool";
import {CarpoolPassenger} from "./CarpoolPassenger";


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

    @Column({type: 'integer', nullable: true, array:true})
    @OneToMany(() => Carpool, carpool => carpool.driver)
    carpools?: Carpool[];

    @Column({type: 'integer',nullable: true, array:true})
    @OneToMany(() => Event, (event: Event) => event.createdBy)
    events?: Event[];

    @Column({type: 'integer',nullable: true, array: true})
    @OneToMany(() => UserEventStatus, (userEventStatus: UserEventStatus) => userEventStatus.user)
    userEventStatuses?: UserEventStatus[];

    @Column({type: 'integer', nullable: true, array: true})
    @OneToMany(() => CarpoolPassenger, (carpoolPassenger: CarpoolPassenger) => carpoolPassenger.user)
    carpoolPassengers?: CarpoolPassenger[]

}