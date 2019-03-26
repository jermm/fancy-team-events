import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import {CarpoolPassenger} from "./CarpoolPassenger";
import {Event} from "./Event";
import {User} from "./User";



@Entity()
export class Carpool {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column('integer', {nullable: true})
    @ManyToOne(() => User, (user: User) => user.carpools)
    driver?: User;

    @Column('integer', {nullable: true})
    @ManyToMany(type => Event, event => event.carpoolDrivers)
    event?: Event;

    @Column({nullable: true})
    @Column()
    noOfSeats?: number;

    @Column({nullable: true})
    @Column()
    locationName?: string;

    @Column( {type: 'integer', nullable: true, array:true})
    @OneToMany(() => CarpoolPassenger, (carpoolPassenger: CarpoolPassenger) => carpoolPassenger.carpool)
    carPoolPassengers?: CarpoolPassenger[];
}