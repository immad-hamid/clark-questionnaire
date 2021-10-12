import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnaireV2Component } from './questionnaire-v2.component';

const routes: Routes = [
    {
        path: '',
        component: QuestionnaireV2Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionnaireV2RoutingModule {}
