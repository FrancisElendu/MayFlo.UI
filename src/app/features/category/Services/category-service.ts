import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest, Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private httpClient = inject(HttpClient);
  private apiBaseUrl = 'https://localhost:7287';


  addCategorySatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  addCategory(category: AddCategoryRequest) 
  {
    this.addCategorySatus.set('loading');
    this.httpClient.post<void>(`${this.apiBaseUrl}/api/categories`, category)
    .subscribe(
      {
        next: () => 
          {
            this.addCategorySatus.set('success');
            //console.log('Category added successfully');
          },
        error: () => 
          {
            this.addCategorySatus.set('error');
            console.error('Error adding category');
          }
      });
  }

  getAllCategories() {
    // return this.httpClient.get(`${this.apiBaseUrl}/api/categories`);
    return httpResource<Category[]>(() => `${this.apiBaseUrl}/api/categories`);
  }
  
}
