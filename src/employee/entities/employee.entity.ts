import { Check, Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
@Check("EMPTY_EMAIL_CHECK", `LENGTH(email) > 0`)
@Check("EMPTY_NAME_CHECK", `LENGTH(email) > 0`)
export class Employee {
     @PrimaryColumn()
     employeeIdentifier: string

     @Column({nullable: false, unique:true})
     email: string

     @Column({nullable:false})
     name: string

     @Column()
     phone: string

}
