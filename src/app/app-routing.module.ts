import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'questionnaire/v1'
    },
    {
        path: 'questionnaire/v1',
        loadChildren: () =>
            import('./pages/questionnaire/questionnaire.module').then(
                (m) => m.QuestionnaireModule
            )
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
