import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import {CarpoolPassenger} from "./CarpoolPassenger";
import {Event} from "./Event";
import {User} from "./User";



@Entity()
export class Carpool {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user: User) => user.carpools)
    driver?: User;

    @ManyToMany(type => Event, event => event.carpoolDrivers)
    event: Event;

    @Column()
    noOfSeats: number;

    @Column()
    locationName: string;

    @OneToMany(() => CarpoolPassenger, (carpoolPassenger: CarpoolPassenger) => carpoolPassenger.carpool)
    carPoolPassengers: CarpoolPassenger[];
}