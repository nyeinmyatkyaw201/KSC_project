import { Component, OnInit } from '@angular/core';
import { FormRegiModel } from './registration';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration-b',
  templateUrl: './registration-b.component.html',
  styleUrls: ['./registration-b.component.css'],
})
export class RegistrationBComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getRelation();
    this.getBmember();
    console.log(this.RegiDatas,">>>>>>>>>>>")
  }
  BMember: any = [];
  relations: any = [];
  Name!: String;
  Date_of_Birth!: Date;
  Work!: string;
  Card!: String;

  RegiDatas: FormRegiModel[] = [];

  addRow() {
    var parentid = this.route.snapshot.paramMap.get('id');
    const newFormRegiModel: FormRegiModel = new FormRegiModel();
    newFormRegiModel.parentid = parentid;
    this.RegiDatas.push(newFormRegiModel);
    console.log(this.RegiDatas,"<<<<<<<<>>>>>>>>")
  }
  removeRow(index: number) {
    this.RegiDatas.splice(index, 1);
  }
  createBMember() {
    console.log(this.RegiDatas);
    this.api.createBMember(this.RegiDatas).subscribe({
      next: () => {
       
        console.log('B Member created Successfull');
        var parentid = this.route.snapshot.paramMap.get('id');
        const key = `RegiDatas_${parentid}`;
        this.api.parentid = parentid;
        localStorage.setItem(key, JSON.stringify(this.RegiDatas));
        this.router.navigateByUrl(`upload`);
      },
      error: (err) => {
        alert('Failed to create B Member');
        console.log('Failed to create B Member', err);
      },
    });
  }
  getRelation() {
    this.api.GetRelation().subscribe((result: any) => {
      this.relations = result.data;
      console.log(this.relations, 'relation');
    });
  }
  getBmember() {
    var parentid = this.route.snapshot.paramMap.get('id');
    const key = `RegiDatas_${parentid}`;
    const storedData = localStorage.getItem(key);
    if (storedData) {
      this.RegiDatas = JSON.parse(storedData);
    }
  };
  getandDelete(){
    var parentid = this.route.snapshot.paramMap.get('id');
    this.api.getandDelete(parentid).subscribe({
      next : ()=>{
        console.log("delete Successfully");
        
      },
      error : (err)=>{
        console.log(err)
      }
    })
  }
  save(){
    if(this.RegiDatas.length == 0){
      this.router.navigateByUrl('upload')
    }else if(this.RegiDatas.length > 0){
      this.getandDelete()
      this.createBMember()
    }
  }
}
