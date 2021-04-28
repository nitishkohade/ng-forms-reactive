import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genders = ['male', 'female'];
  signupForm: FormGroup
  forbiddenUsernames = ["tom", "jerry"]

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    })
    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value)
    // })
    this.signupForm.statusChanges.subscribe((value) => {
      console.log(value)
    })
    // this.signupForm.setValue({
    //   //all of them
    // })
   
  }

  onSubmit() {
    console.log(this.signupForm)
    this.signupForm.reset({
      gender: 'male'
    })
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    // (<FormArray>this.signupForm.get('hobbies')).push(control)
    (this.signupForm.get('hobbies') as FormArray).push(control)
  }

  // forbiddenNames = (control: FormControl): {[s: string]: boolean} => {
  //   if(this.forbiddenUsernames.indexOf(control.value) !== -1){
  //     return {nameIsForbidden: true}
  //   }
  //   return null;
  // }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true}
    }
    return null
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === "nitish.kohade@gmail.com") {
          resolve({'emailIsForbidden': true})
        } else {
          resolve(null)
        }
      }, 2000)
    })
    return promise
  }
}
