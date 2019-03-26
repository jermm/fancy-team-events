import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {User} from "./User";
import {Event} from "./Event";



@Entity()
export class UserEventStatus {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column("integer", {nullable: true})
    @ManyToOne(type => User, (user: User) => user.userEventStatuses)
    user?: User;

    @Column('integer', {nullable: true})
    @ManyToOne(() => Event, (event: Event) => event.userEventStatuses)
    event?: Event;

    @Column('text', {nullable: true})
    roleType?: string;

    @Column({nullable: true})
    isAttending?: boolean;

    @Column({nullable: true})
    tShirtSize?: string;
}