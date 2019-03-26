import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {User} from "./User";
import {Event} from "./Event";



@Entity()
export class UserEventStatus {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable: true})
    @ManyToOne(() => User, (user: User) => user.userEventStatuses)
    user?: User;

    @Column({nullable: true})
    @ManyToOne(() => Event, (event: Event) => event.userEventStatuses)
    event?: Event;

    @Column({nullable: true})
    roleType?: string;

    @Column({nullable: true})
    isAttending?: boolean;

    @Column({nullable: true})
    tShirtSize?: string;
}