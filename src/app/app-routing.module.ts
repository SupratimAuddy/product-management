import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ErrorComponent } from './Components/error/error.component';
import { ProductsComponent } from './Components/products/products.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'products', pathMatch: 'full'
  },
  {
    path: 'products', component: ProductsComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'contact-us', component: ContactUsComponent
  },
  {
    path: 'error', component: ErrorComponent
  },
  {
    path: '**', redirectTo: 'error' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
