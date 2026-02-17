import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
// 1. import ReactiveFormsModule
// 2. create form group and form control (FormGroups -> FormControls)
// 3. bind form group to form element in html
// 4. bind form controls to input elements in html
// 5. submit form and get form values

addCategoryFormGroup = new FormGroup({
  name: new FormControl<string>('', { nonNullable: true }),
  urlHandle: new FormControl<string>('', { nonNullable: true }),
});

onSubmit() {
  console.log(this.addCategoryFormGroup.value);
  console.log(this.addCategoryFormGroup.getRawValue());

}


}
