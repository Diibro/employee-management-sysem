import { Employee } from "src/employee/entities/employee.entity"
import { TAttendance } from "src/util/types"

export class CreateAttendanceDto {
     employee: Employee
     action: TAttendance 
}
