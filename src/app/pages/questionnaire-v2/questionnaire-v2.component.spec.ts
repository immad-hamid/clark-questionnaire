import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionnaireV2Component } from './questionnaire-v2.component';
import { MaterialUiModule } from 'src/app/shared/modules/material-ui.module';

describe('QuestionnaireV2Component', () => {
    let component: QuestionnaireV2Component;
    let fixture: ComponentFixture<QuestionnaireV2Component>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                BrowserAnimationsModule,
                MaterialUiModule
            ],
            declarations: [QuestionnaireV2Component]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionnaireV2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
