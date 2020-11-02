import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'dyk',
    pathMatch: 'full'
  },


  {path: 'title',  loadChildren: './title/title.module#TitlePageModule'},
  {path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
  {path: 'login', loadChildren: './login/login.module#LoginPageModule' }, 
  {path: 'dyk',
    loadChildren: './dyk/dyk.module#DykPageModule',
    canLoad: [AuthGuard]
  },

  {path: 'dyk/:id',
    loadChildren: './dyk/dyk.module#DykPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'saved',
    loadChildren: './saved/saved.module#SavedPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'my-account',
    loadChildren: './my-account/my-account.module#MyAccountPageModule',
    canLoad: [AuthGuard]  
  },
  {
    path: 'account-edit',
    loadChildren: './account-edit/account-edit.module#AccountEditPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'reset-password',
    loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule',
  },
  {
    path: 'filter',
    loadChildren: './filter/filter.module#FilterPageModule'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
