import { EUserRole } from "src/util/enums"

export class CreateUserDto {
     name:string
     email:string
     password:string
     role:EUserRole
}
