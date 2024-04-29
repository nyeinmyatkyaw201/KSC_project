import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data : any;
  constructor(private http:HttpClient) {}
  identityno : string = '';
  idForUpdate : string = '';
  parentid : any;

  login(data:any){
    return this.http.post('http://localhost:3000/api/v1/user/login',data)
  };
  getNrcNo(){
    return this.http.get("http://localhost:3000/api/v1/user/nrc")
  };
  getNrcPlace(data:any){
    return this.http.get(`http://localhost:3000/api/v1/user/nrc/${data}`)
  };
  getReligion(){
    return this.http.get('http://localhost:3000/api/v1/user/religion')
  };
  getRace(){
    return this.http.get('http://localhost:3000/api/v1/user/race')
  }
  register(data : any){
    return this.http.post('http://localhost:3000/api/v1/user/registrationmember',data)
  }
  updateRegister(data: any, id : any){
    return this.http.patch(`http://localhost:3000/api/v1/user/registrationmember/${id}`,data)
  }
  GetRelation(){
    return this.http.get('http://localhost:3000/api/v1/user/relation')
  }
  createBMember(Mydata:any,id: any){
    return this.http.post(`http://localhost:3000/api/v1/user/registrationmember/Bmembercreate/${id}`,Mydata)
  }
  getandDelete(id: any){
    return this.http.delete(`http://localhost:3000/api/v1/user/registrationmember/BmemberGet/${id}`)
  }
  upload (data:any) {
    return this.http.post(`http://localhost:3000/api/v1/member/upload`,data);
  }

  Uploadedfile(id : any){
    return this.http.get(`http://localhost:3000/api/v1/member/upload/getallfile/${id}`)
  }

  deletephoto(id:any){
    return this.http.delete(`http://localhost:3000/api/v1/member/upload/deletephoto/${id}`)
  }

  upploadAndCreate(data:any,id: any){
    return this.http.post(`http://localhost:3000/api/v1/A_member/recmember_of_upload/${id}`,data);
  }
  uploadUpdate(data:any,id : any){
    return this.http.patch(`http://localhost:3000/api/v1/A_member/update/${id}`,data)
  }
  getAmemberName( ){
    return this.http.get(`http://localhost:3000/api/v1/A_member/${this.parentid}`)
  }
}
