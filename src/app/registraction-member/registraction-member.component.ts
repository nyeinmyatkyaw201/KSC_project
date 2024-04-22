import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { FormDataModel } from './registration';

@Component({
  selector: 'app-registraction-member',
  templateUrl: './registraction-member.component.html',
  styleUrls: ['./registraction-member.component.css'],
})
export class RegistractionMemberComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.getnrc();
    this.getReligion();

    this.getRace();
    this.getItem();
    console.log(this.registrationData.nrcNocity);
  }
  identityno: string = '';
  id: any = '';
  nrcNo: any = [];
  nrcplace: any = [];
  nrc: any = [];
  religionarray: any = [];
  racearray: any = [];
  errormessage?: string;

  getItem() {
    console.log(this.api.identityno, '>>>>>>>>>>');
    const key = `formData_${this.api.identityno}`;
    const storedData = localStorage.getItem(key);
    if (storedData) {
      this.registrationData = JSON.parse(storedData);
      const event = { target: { value: this.registrationData.nrcNostate } };
      this.getnrcPlace(event);
    }
  }

  registrationData: FormDataModel = new FormDataModel();
  myNrc = [
    '-',
    '၁',
    '၂',
    '၃',
    '၄',
    '၅',
    '၆',
    '၇',
    '၈',
    '၉',
    '၁၀',
    '၁၁',
    '၁၂',
    '၁၃',
    '၁၄',
  ];
  today = new Date();
  calculateAge(birthday: Date): number {
    const diffTime: number = Math.abs(
      this.today.getTime() - birthday.getTime()
    );
    const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const age: number = Math.floor(diffDays / 365.25);
    return age;
  }

  registration() {
    if (!this.registrationData.birthdate) {
      this.errormessage = 'မွေးသက္ကရာဇ်ထည့်သွင်းပေးပါ';
      setTimeout(() => {
        this.errormessage = '';
      }, 2000);
      return;
    }
    const birthdayDate: Date = new Date(this.registrationData.birthdate);
    const age: number = this.calculateAge(birthdayDate);
    console.log(age, ' >>>>');

    if (age < 18) {
      this.errormessage = 'အသက်မပြည့်သေးပါ';
      setTimeout(() => {
        this.errormessage = '';
      }, 2000);
    } else if (
      !this.registrationData.nrcNocity ||
      this.registrationData.nrcNocity == '-' ||
      !this.registrationData.nrcNostate ||
      this.registrationData.nrcNostate == '-' ||
      !this.registrationData.nrcNotype ||
      this.registrationData.nrcNotype == '--' ||
      !this.registrationData.nrcNumber
    ) {
      this.errormessage = 'မှတ်ပုံတင်နံပါတ်ပြန်လည်ရိုက်သွင်းပေးပါ';
      setTimeout(() => {
        this.errormessage = '';
      }, 2000);
    } else if (this.registrationData.nrcNumber?.length != 6) {
      this.errormessage = 'မှတ်ပုံတင်နံပါတ်မှားယွင်းနေပါသည်';
      setTimeout(() => {
        this.errormessage = '';
      }, 2000);
    } else if (this.api.idForUpdate) {
      this.updateMember();
    } else {
      this.register();
    }
  }

  async getnrc() {
    await this.api.getNrcNo().subscribe({
      next: (data: any) => {
        console.log(data);
        const Mydata = data.data;
        console.log(Mydata);
        this.nrcNo = Mydata.map((array: any) => array.t3);
        console.log(this.nrcNo);
        this.nrc = this.nrcNo.filter(
          (value: any, index: any) => this.nrcNo.indexOf(value) === index
        );
        console.log(this.nrc);
      },
      error: (err: any) => {
        this.errormessage = err.error.message;
        console.log(err);
      },
    });
  }
  async getnrcPlace(event: any) {
    const id = event.target.value;
    this.registrationData.nrcNostate = event.target.value;
    console.log(this.registrationData.nrcNostate);
    await this.api.getNrcPlace(id).subscribe({
      next: (data: any) => {
        console.log(data);
        const nrcdata = data.nrc;

        this.nrcplace = nrcdata.map((array: any) => array.t2);
        console.log(this.nrcplace);
        // console.log(this.nrcNo)
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  async getReligion() {
    await this.api.getReligion().subscribe({
      next: (data: any) => {
        const religionData = data.data;
        this.religionarray = religionData.map((array: any) => array.t2);
        console.log(this.religionarray);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  async getRace() {
    await this.api.getRace().subscribe({
      next: (data: any) => {
        const raceData = data.data;
        this.racearray = raceData.map((array: any) => array.t2);
        console.log();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  async register() {
    this.identityno =
      this.registrationData.nrcNostate +
      '/' +
      this.registrationData.nrcNocity +
      this.registrationData.nrcNotype +
      this.registrationData.nrcNumber;
    const myData = {
      name: this.registrationData.name,
      othername: this.registrationData.othername,
      birthplace: this.registrationData.birthplace,
      birthdate: this.registrationData.birthdate,
      identityno: this.identityno,

      fathername: this.registrationData.fathername,
      mothername: this.registrationData.mothername,
      education: this.registrationData.education,
      work: this.registrationData.work,
      currentwork: this.registrationData.currentwork,
      address: this.registrationData.address,
      currentaddress: this.registrationData.currentaddress,
      phoneno: this.registrationData.phone?.toString(),
      workplace: this.registrationData.workplace,
      lastwork: this.registrationData.lastwork,
      racereligion:
        this.registrationData.race + '/' + this.registrationData.religion,
    };
    console.log(myData);
    console.log(this.registrationData.race);

    await this.api.register(myData).subscribe({
      next: (data: any) => {
        console.log(data);

        (this.id = data.user.id), (this.api.idForUpdate = this.id);
        console.log(this.id);
        this.api.identityno = this.identityno;
        const key = `formData_${this.api.identityno}`;
        localStorage.setItem(key, JSON.stringify(this.registrationData));
        this.router.navigateByUrl(`registration/${this.id}`);
      },
      error: (err: any) => {
        console.log(err);
        if ((err.message = 'already exist this member')) {
          this.errormessage = 'ဤမှတ်ပုံတင်နံပါတ်ဖြင့်အသင်းဝင်ရှိပြီးပါပီ';
          setTimeout(() => {
            this.errormessage = '';
          }, 2000);
        }
      },
    });
  }
  async updateMember() {
    console.log(this.registrationData);
    console.log(this.api.idForUpdate);
    await this.api
      .updateRegister(this.registrationData, this.api.idForUpdate)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigateByUrl(`registration/${this.api.idForUpdate}`);
        },
        error: (err: any) => {
          console.log(err.message);
          if ((err.message = 'already exist this member')) {
            this.errormessage = 'ဤမှတ်ပုံတင်နံပါတ်ဖြင့်အသင်းဝင်ရှိပြီးပါပီ';
            setTimeout(() => {
              this.errormessage = '';
            }, 2000);
          }
        },
      });
  }
}
