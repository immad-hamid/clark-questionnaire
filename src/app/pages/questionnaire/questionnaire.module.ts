import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUiModule } from 'src/app/shared/modules/material-ui.module';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnaireComponent } from './questionnaire.component';

@NgModule({
    declarations: [QuestionnaireComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        QuestionnaireRoutingModule,
        MaterialUiModule
    ]
})
export class QuestionnaireModule {}
