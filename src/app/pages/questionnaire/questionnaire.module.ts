import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUiModule } from 'src/app/shared/modules/material-ui.module';
import { QuestionnaireDetailComponent } from './questionnaire-detail/questionnaire-detail.component';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnaireComponent } from './questionnaire.component';

@NgModule({
    declarations: [QuestionnaireComponent, QuestionnaireDetailComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        QuestionnaireRoutingModule,
        MaterialUiModule
    ],
    providers: [HttpClientModule]
})
export class QuestionnaireModule {}
