import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {Carpool} from "./Carpool";
import {User} from "./User";

@Entity()
export class CarpoolPassenger {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column('integer',{nullable: true})
    @ManyToOne(() => User, (user: User) => user.carpoolPassengers)
    user?: User;

    @Column('integer',{nullable: true})
    @ManyToOne(() => Carpool, (carpool: Carpool) => carpool.carPoolPassengers)
    carpool?: Carpool;
}