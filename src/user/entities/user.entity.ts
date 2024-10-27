import { EUserRole } from "src/util/enums";
import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Check("EMPTY_EMAIL_CHECK", `LENGTH(email) > 0`)
@Check("EMPTY_PASSWORD_CHECK", `LENGTH(email) > 0`)
export class User {
     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     name: string;

     @Column({ unique: true, nullable:false })
     email: string;

     @Column({nullable:false})
     password: string;

     @Column({type:'enum', enum: EUserRole, default: EUserRole.EMPLOYEE})
     role: EUserRole
}
