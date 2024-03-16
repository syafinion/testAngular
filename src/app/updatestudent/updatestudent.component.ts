import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-updatestudent',
  templateUrl: './updatestudent.component.html',
  styleUrls: ['./updatestudent.component.css']
})

export class UpdatestudentComponent implements OnInit {

  studentForm = new FormGroup({
    'studentID':new FormControl('',Validators.required),
    'studentName':new FormControl('',Validators.required),
    'studentEmail':new FormControl('',Validators.required),
    'studentPhone':new FormControl('',Validators.required),
    'studentIntake':new FormControl('',Validators.required)


  });

  constructor(private service:ApiserviceService,  private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;
  message: boolean= false;

  ngOnInit(): void {

      this.service.getOnestudent(this.router.snapshot.params['id']).subscribe((res:any)=>{
        console.log(res,'res==>');
        this.studentForm.patchValue({
          studentID:res.data[0].studentID,
            studentName:res.data[0].studentName,
            studentEmail:res.data[0].studentEmail,
            studentPhone:res.data[0].studentPhone,
            studentIntake:res.data[0].studentIntake

        });
      });
  }
//to update a student
studentUpdate()
{
  console.log(this.studentForm.value);
    this.service.updatestudent(this.router.snapshot.params['id'], this.studentForm.value).subscribe((result:any)=>{

    this.studentForm.reset();
    this.successmsg = 'Profile successfully updated';
    this.message = true;

    });
  }
removeMessage(){
  this.message = false;
}
}