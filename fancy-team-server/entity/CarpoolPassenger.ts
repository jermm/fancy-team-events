import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {Carpool} from "./Carpool";
import {User} from "./User";

@Entity()
export class CarpoolPassenger {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user: User) => user.carpoolPassengers)
    user?: User;

    @ManyToOne(() => Carpool, (carpool: Carpool) => carpool.carPoolPassengers)
    carpool: Carpool;
}