import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SiglePostComponent } from './pages/sigle-post/sigle-post.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WritePostComponent } from './pages/write-post/write-post.component';
import { UpadtePostComponent } from './pages/upadte-post/upadte-post.component';
import { MessageComponent } from './pages/message/message.component';
import { RoundedComponent } from './pages/rounded/rounded.component';
import { ViewDonationComponent } from './pages/view-donation/view-donation.component';
import { FilterComponent } from './filter/filter.component';

export const routes: Routes = [
    {'path': '', 'title':'Home', component:HomeComponent},
    {'path': 'about', 'title':'About', component:AboutComponent},
    {'path': 'contact' ,'title':'Contact', component:ContactComponent},
    {'path': 'siglepost/:id' ,'title':'Sigle Post', component:SiglePostComponent},
    {'path': 'viewdonation' ,'title':'View Donation', component:ViewDonationComponent},
    {'path': 'writePost' ,'title':'Write Post', component:WritePostComponent},
    {'path': 'updatePost' ,'title':'Update Post', component:UpadtePostComponent},
    {'path': 'login' ,'title':'Login', component:LoginComponent},
    {'path': 'message' ,'title':'Messages', component:MessageComponent},
    {'path': 'register' ,'title':'Register', component:RegisterComponent},
    {'path': 'rounded' ,'title':'Rounded', component:RoundedComponent},
    { path: 'posts/categories/:categoryName', title: 'Filter Posts', component: FilterComponent }, // New route for filtering posts
    { path: 'posts/update/:id', component: UpadtePostComponent },



    {'path': '**', component:PageNotFoundComponent},
];
