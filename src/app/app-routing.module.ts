import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CategoryComponent } from './category/category.component';
import { ResourcesComponent } from './resources/resources.component';
import { SearchComponent } from './search/search.component';

/**
 * Потім привязати роути до компонент:
 */
const routes: Routes = [
    { path: '', component: CategoryComponent },
    { path: 'category/:uuid', component: CategoryComponent },
    { path: 'resources', component: ResourcesComponent }, // тут список іконок, звуків, кнопок
    { path: 'search', component: SearchComponent },
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled',
            relativeLinkResolution: 'legacy'
        }),
    ],

    exports: [RouterModule]
})

export class AppRoutingModule { }
