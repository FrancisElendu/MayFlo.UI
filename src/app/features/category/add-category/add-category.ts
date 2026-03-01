import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../models/category.model';
import { CategoryService } from '../Services/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory 
{
  router: Router = inject(Router);
    // 1. import ReactiveFormsModule
    // 2. create form group and form control (FormGroups -> FormControls)
    // 3. bind form group to form element in html
    // 4. bind form controls to input elements in html
    // 5. submit form and get form values

    constructor()
    {
        effect(() => 
        {
          if(this.categoryService.addCategorySatus() === 'success') 
          {
            this.categoryService.addCategorySatus.set('idle');
            this.router.navigate(['admin/categories']);
            //console.log('Category added successfully');
          }
          if(this.categoryService.addCategorySatus() === 'error') 
          {
            console.error('Error adding category');
          }
        });
    }

    private categoryService = inject(CategoryService);

    addCategoryFormGroup = new FormGroup({
      name: new FormControl<string>('', { 
        nonNullable: true, 
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      urlHandle: new FormControl<string>('', { 
        nonNullable: true, 
        validators: [Validators.required, Validators.maxLength(100)],
      }),
    });

    getErrorMessagesForName(): string {
      // let field = this.addCategoryFormGroup.controls.name;
      let field = this.nameFormControl;
      if (field.hasError('required')) {
        return 'Name is required';
      }
      if (field.hasError('maxlength')) {
        return 'Name is too long';
      }
      return ""
    } 


    getErrorMessagesForUrlHandle(): string {
      let field = this.urlHandleFormControl;  
      if (field.hasError('required')) {
        return 'Url Handle is required';
      }
      if (field.hasError('maxlength')) {
        return 'Url Handle is too long';
      }
      return ""      
    }

      get nameFormControl() {
      return this.addCategoryFormGroup.controls.name
    }

    get urlHandleFormControl() {
      return this.addCategoryFormGroup.controls.urlHandle
    }

    onSubmit() 
    {
      // console.log(this.addCategoryFormGroup.value);
      const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();

      const addCategoryRequest: AddCategoryRequest = {
        name: addCategoryFormValue.name,
        urlHandle: addCategoryFormValue.urlHandle,
      };

      this.categoryService.addCategory(addCategoryRequest);
    }
}
