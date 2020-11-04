import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchiveAppComponent } from './archive.app.component';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';

const produtoRouterConfig: Routes = [
    {
        path: '', component: ArchiveAppComponent,
        children: [
            { path: 'index', component: IndexComponent },
            { path: '', component: IndexComponent },
            {
                path: 'new', component: NewComponent,
            }

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(produtoRouterConfig)
    ],
    exports: [RouterModule]
})
export class ArchiveRoutingModule { }