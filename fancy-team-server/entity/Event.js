"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const UserEventStatus_1 = require("./UserEventStatus");
const Carpool_1 = require("./Carpool");
let Event = class Event {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.events),
    __metadata("design:type", User_1.User)
], Event.prototype, "createdBy", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "type", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "eventDate", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "startTime", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "endTime", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "locationName", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "locationAddress", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "deadlineDate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.OneToMany(() => UserEventStatus_1.UserEventStatus, (userEventStatus) => userEventStatus.event, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Event.prototype, "userEventStatuses", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.ManyToMany(type => Carpool_1.Carpool, carpool => carpool.event),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Event.prototype, "carpoolDrivers", void 0);
Event = __decorate([
    typeorm_1.Entity()
], Event);
exports.Event = Event;
//# sourceMappingURL=Event.js.map