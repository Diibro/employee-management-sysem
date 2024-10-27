export class CResponse {
     private status:boolean
     private message: string
     private data: any
     private error:any

     constructor(status:boolean, message: string, data?:any, error?: any){
          this.data =data;
          this.message = message;
          this.error = error;
          this.status = status
     }

     public getObject(){
          return {status: this.status, message:this.message, data:this.data, error: this.error }
     }
}