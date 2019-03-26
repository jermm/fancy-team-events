import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import {CarpoolPassenger} from "./CarpoolPassenger";
import {Event} from "./Event";
import {User} from "./User";



@Entity()
export class Carpool {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    @ManyToOne(() => User, (user: User) => user.carpools)
    driver?: User;

    @Column({nullable: true})
    @ManyToMany(type => Event, event => event.carpoolDrivers)
    event?: Event;

    @Column({nullable: true})
    @Column()
    noOfSeats?: number;

    @Column({nullable: true})
    @Column()
    locationName?: string;

    @Column({nullable: true})
    @OneToMany(() => CarpoolPassenger, (carpoolPassenger: CarpoolPassenger) => carpoolPassenger.carpool)
    carPoolPassengers?: CarpoolPassenger[];
}