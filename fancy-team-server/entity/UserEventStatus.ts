import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {User} from "./User";
import {Event} from "./Event";



@Entity()
export class UserEventStatus {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user: User) => user.userEventStatuses)
    user?: User;

    @ManyToOne(() => Event, (event: Event) => event.userEventStatuses)
    event: Event;

    @Column()
    roleType: string;

    @Column()
    isAttending: boolean;

    @Column()
    tShirtSize: string;
}