import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
    },
    {
        path: 'user',
        loadChildren: () => import('../app/core/user/user.module').then(m => m.UserModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('../app/core/admin/admin.module').then(m => m.AdminModule)
    }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }