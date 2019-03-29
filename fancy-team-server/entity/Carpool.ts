import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, JoinColumn, ManyToOne} from "typeorm";

@Entity()
export class Carpool {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column('text', {nullable: false})
    driver?: string;

    @Column('integer', {nullable: true})
    event?: number;

    @Column({nullable: true})
    noOfSeats?: number;

    @Column({nullable: true})
    locationName?: string;

    @Column( {type: 'integer', nullable: true, array:true})
    carPoolPassengers?: number[];
}