import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  isBrowser!: boolean;
  isServer!: boolean;
  registrationForm: FormGroup;
  editIndex: number | null = null;

  //regsitrationDetails :[{firstname:string,lastname:string,email:string,phone:string}]
  registrationDetails: any [] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder:FormBuilder)
    
  {
     this.isBrowser = isPlatformBrowser(this.platformId);
     this.isServer = isPlatformServer(this.platformId);
  }

  ngOnInit() {
    
    const namePattern = /^[A-Za-z]+$/;
    const phonePattern = /^[0-9]{10}$/;

    
    this.registrationForm = new FormGroup({
      firstname: new FormControl('',[Validators.required,Validators.pattern(namePattern)]),
      lastname: new FormControl('',[Validators.required,Validators.pattern(namePattern)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required,Validators.pattern(phonePattern)])
    })
  
  }
  onSubmit(){
    if (this.registrationForm.valid) {
      if(this.editIndex !== null){
        this.registrationDetails[this.editIndex]=this.registrationForm.value
        this.editIndex = null;
      }
      else {
        if(!this.registrationDetails){
       this.registrationDetails = [];
      }
      this.registrationDetails.push(this.registrationForm.value)
    }
      this.registrationForm.reset();
      // Process the form data
    } else {
      console.log('Form is invalid');

    }
 }

 


 onEdit(index:number){
this.editIndex=index;
this.registrationForm.setValue(this.registrationDetails[index])
 }
 delete(index:number){
  this.registrationDetails.splice(index,1)
 }
}
