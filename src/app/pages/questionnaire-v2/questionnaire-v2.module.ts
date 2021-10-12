import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUiModule } from 'src/app/shared/modules/material-ui.module';
import { QuestionnaireV2Component } from './questionnaire-v2.component';
import { QuestionnaireV2RoutingModule } from './questionnaire-v2-routing.module';

@NgModule({
    declarations: [QuestionnaireV2Component],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        QuestionnaireV2RoutingModule,
        MaterialUiModule
    ]
})
export class QuestionnaireV2Module {}
