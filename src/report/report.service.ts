import { Injectable } from '@nestjs/common';
import jsPDF from 'jspdf';
import { AttendanceService } from 'src/attendance/attendance.service';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ReportService {
     constructor(
          private readonly attendanceService: AttendanceService
     ){}

     async generatePDFReport(attendanceRecords: any[]): Promise<Buffer> {
          const pdf = new jsPDF();
          
          pdf.setFontSize(20);
          pdf.text('Attendance Report', 20, 20);
          
          pdf.setFontSize(12);
          pdf.text('Employee Name', 20, 30);
          pdf.text('Date', 20, 40);
          pdf.text('Status', 20, 50);
          
          let y = 60;
          attendanceRecords.forEach((record) => {
               pdf.text(record.employeeName, 20, y);
               pdf.text(record.date, 100, y);
               pdf.text(record.status, 160, y);
            y += 10; // Increment y position for each record
          });
      
          return pdf.output('arraybuffer'); // Output as a Buffer
          }
      
          async generateExcelReport(attendanceRecords: any[]) {
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('Attendance Report');
          
          worksheet.columns = [
               { header: 'Employee Name', key: 'employeeName', width: 30 },
               { header: 'Date', key: 'date', width: 20 },
               { header: 'Status', key: 'status', width: 15 },
          ];
          
          attendanceRecords.forEach((record) => {
               worksheet.addRow({
               employeeName: record.employeeName,
               date: record.date,
               status: record.status,
               });
          });
          const buffer = await workbook.xlsx.writeBuffer();
          return buffer; 
     }

     async getAttendanceRecords(): Promise<any[]> {
     return await this.attendanceService.findAll();
     }
}
