import { Routes } from '@angular/router';
import { CategoryList } from './features/category/category-list/category-list';
import { AddCategory } from './features/category/add-category/add-category';

export const routes: Routes = [
    {
        path: 'admin/categories',
        // component: CategoryList
        loadComponent: () => import('./features/category/category-list/category-list').then(m => m.CategoryList)
    },
    {
        path: 'admin/categories/add',
        //component: AddCategory
        loadComponent: () => import('./features/category/add-category/add-category').then(m => m.AddCategory)
    },
    {path: '**', redirectTo: 'admin/categories'}

];
