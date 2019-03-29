import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class UserEventStatus {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column('integer', {nullable: false})
    event?: number;

    @Column('text', {nullable: true})
    email?: string;

    @Column({nullable: true})
    isAttending?: boolean;

    @Column({nullable: true})
    tShirtSize?: string;
}