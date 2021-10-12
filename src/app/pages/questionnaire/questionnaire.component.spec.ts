import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from 'src/app/shared/modules/material-ui.module';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { SnackBarServiceMock } from 'src/app/tests/mocks/services/snack-bar-service.mock';
import { QuestionnaireComponent } from './questionnaire.component';

describe('QuestionnaireComponent', () => {
    let component: QuestionnaireComponent;
    let fixture: ComponentFixture<QuestionnaireComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                BrowserAnimationsModule,
                MaterialUiModule
            ],
            declarations: [QuestionnaireComponent],
            providers: [
                { provide: SnackBarService, useClass: SnackBarServiceMock }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionnaireComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('toggleScroll method should be called when lifecycle method onNgOnIt is called', () => {
        spyOn(component as any, 'toggleScroll');
        component.ngOnInit();
        expect((component as any).toggleScroll).toHaveBeenCalled();
    });

    it('disableScroll method should be called when lifecycle method onNgOnIt is called', () => {
        spyOn(component as any, 'disableScroll');
        component.ngOnInit();
        expect((component as any).disableScroll).toHaveBeenCalled();
    });

    it('setControlsDependencies method should be called when lifecycle method onNgOnIt is called', () => {
        spyOn(component as any, 'setControlsDependencies');
        component.ngOnInit();
        expect((component as any).setControlsDependencies).toHaveBeenCalled();
    });

    it('createFormControls method should be called when lifecycle method onNgOnIt is called', () => {
        spyOn(component as any, 'createFormControls');
        component.ngOnInit();
        expect((component as any).createFormControls).toHaveBeenCalled();
    });

    it('form should be filled and should be truthy', () => {
        component.questionnaireForm.setValue({
            list_12110962: 'Meine Familie mit Kindern',
            list_12111610: 'Ja',
            list_12111777: 'Nein',
            list_12110966: 'Unwichtig',
            list_12110967: 'Ja',
            list_12110968: 'Ja, im Inland',
            list_13907264: 'Ja, im Inland',
            list_12111854: 'Nein',
            list_12110972: 'Unwichtig',
            list_13913438: 'Nein',
            list_12110969: 'Nein',
            list_12110970: 'Nein',
            list_12110971: 'Nein',
            list_12110965: 'Nein',
            list_12111717: 'Nein',
            list_12111755: null,
            date_22039590: 'Dummy Text Input',
            textarea_12110979: 'Dummy Text Area'
        });
        expect(component.questionnaireForm.valid).toBe(true);
    });

    it('form should be filled and should be falsy', () => {
        component.questionnaireForm.setValue({
            list_12110962: null,
            list_12111610: null,
            list_12111777: 'Nein',
            list_12110966: 'Unwichtig',
            list_12110967: 'Ja',
            list_12110968: 'Ja, im Inland',
            list_13907264: 'Ja, im Inland',
            list_12111854: 'Nein',
            list_12110972: 'Unwichtig',
            list_13913438: 'Nein',
            list_12110969: 'Nein',
            list_12110970: 'Nein',
            list_12110971: 'Nein',
            list_12110965: 'Nein',
            list_12111717: 'Nein',
            list_12111755: null,
            date_22039590: 'Dummy Text Input',
            textarea_12110979: 'Dummy Text Area'
        });
        expect(component.questionnaireForm.valid).toBe(false);
    });

    it('onSuccess should be called when form is valid', () => {
        component.questionnaireForm.setValue({
            list_12110962: 'Meine Familie mit Kindern',
            list_12111610: null,
            list_12111777: 'Nein',
            list_12110966: 'Unwichtig',
            list_12110967: 'Ja',
            list_12110968: 'Ja, im Inland',
            list_13907264: 'Ja, im Inland',
            list_12111854: 'Nein',
            list_12110972: 'Unwichtig',
            list_13913438: 'Nein',
            list_12110969: 'Nein',
            list_12110970: 'Nein',
            list_12110971: 'Nein',
            list_12110965: 'Nein',
            list_12111717: 'Nein',
            list_12111755: null,
            date_22039590: 'Dummy Text Input',
            textarea_12110979: 'Dummy Text Area'
        });

        spyOn(component as any, 'onSucess');
        component.submit();
        expect((component as any).onSucess).toHaveBeenCalled();
    });

    it('onFaliure should be called when form is invalid', () => {
        component.questionnaireForm.setValue({
            list_12110962: null,
            list_12111610: null,
            list_12111777: 'Nein',
            list_12110966: 'Unwichtig',
            list_12110967: 'Ja',
            list_12110968: 'Ja, im Inland',
            list_13907264: 'Ja, im Inland',
            list_12111854: 'Nein',
            list_12110972: 'Unwichtig',
            list_13913438: 'Nein',
            list_12110969: 'Nein',
            list_12110970: 'Nein',
            list_12110971: 'Nein',
            list_12110965: 'Nein',
            list_12111717: 'Nein',
            list_12111755: null,
            date_22039590: 'Dummy Text Input',
            textarea_12110979: 'Dummy Text Area'
        });

        spyOn(component as any, 'onFaliure');
        component.submit();
        expect((component as any).onFaliure).toHaveBeenCalled();
    });

    it('snack bar should be called when form is invalid', () => {
        spyOn(component.snackBar, 'openSnackBar');
        (component as any).onFaliure();
        const message = 'You need to fill all the required fields...';
        expect(component.snackBar.openSnackBar).toHaveBeenCalled();
        expect(component.snackBar.openSnackBar).toHaveBeenCalledWith(message);
    });
});
