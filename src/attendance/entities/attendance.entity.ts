

import { Employee } from "src/employee/entities/employee.entity";
import { TAttendance } from "src/util/types";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["employee", "action", "createdAt"])
export class Attendance {
     @PrimaryGeneratedColumn('uuid')
     id: string;

     @ManyToOne(() => Employee, (employee) => employee.attendances, {eager:true})
     @JoinColumn({name:'employee-identifier'})
     employee: Employee

     @Column()
     action: TAttendance

     @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
     createdAt: Date;
}
