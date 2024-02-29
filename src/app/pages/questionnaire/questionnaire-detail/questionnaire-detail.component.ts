import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { QuestionnaireI } from './../../../interfaces/interfaces';
import { SelectionType } from './../../../constants/selectionType';
import disableScroll from 'disable-scroll';
import { SnackBarService } from '../../../shared/services/common/snack-bar.service';

@Component({
    selector: 'app-questionnaire-detail',
    templateUrl: './questionnaire-detail.component.html',
    styleUrls: ['./questionnaire-detail.component.scss']
})
export class QuestionnaireDetailComponent implements OnInit, OnDestroy {
    @Input() questionnaire: QuestionnaireI[];
    questionnaireForm: UntypedFormGroup;

    get selectionType(): typeof SelectionType {
        return SelectionType;
    }

    constructor(private fb: UntypedFormBuilder, public snackBar: SnackBarService) {}

    ngOnInit(): void {
        this.init();
    }

    init() {
        this.questionnaireForm = this.fb.group({});
        this.toggleScroll();
        this.disableScroll();
        this.setControlsDependencies();
        this.createFormControls(this.questionnaire);
    }

    ngOnDestroy(): void {
        this.toggleScroll(true);
    }

    private disableScroll(): void {
        // this is a fix to have the smooth
        // scroll working correctly when scroll
        // is enabled with delay
        const bodyEl = document.querySelector('body');
        bodyEl.className += ' stop-scrolling';
    }

    private toggleScroll(currState?: boolean): void {
        if (currState) disableScroll.off();
        else disableScroll.on();
    }

    private setControlsDependencies(): void {
        if (!this.questionnaire?.length) return;

        const withJumps = this.questionnaire.filter(
            (question) => question.jumps?.length
        );

        // change in response
        // add dependency field to object which would be navigated to after certain selection
        // this also helps to easily use a built-in directive
        withJumps.forEach((question) => {
            question.jumps.forEach((jump) => {
                const destinationId = jump.destination.id;
                this.questionnaire.forEach((q) => {
                    if (q.identifier === destinationId) {
                        q['dependency'] = {
                            key: jump.conditions[0].field,
                            value: jump.conditions[0].value
                        };
                    }
                });
            });
        });
    }

    // construct reactive form dynamically
    private createFormControls(controls: Array<QuestionnaireI>): void {
        if (!controls?.length) return;

        for (let control of controls) {
            const newFormControl = new UntypedFormControl();

            if (control.required) {
                newFormControl.setValidators(Validators.required);
            }

            this.questionnaireForm.addControl(
                control.identifier,
                newFormControl
            );
        }
    }

    // scroll to next time
    scrollTo(item: QuestionnaireI): void {
        if (item?.jumps?.length) {
            const selectedValue = this.questionnaireForm.get(
                item.identifier
            )?.value;
            const toScrollObj = item.jumps.filter((jump): string | void => {
                // fix for the type error
                if (!jump || !jump.conditions) return;

                if (jump.conditions[0].value === selectedValue) {
                    return jump.destination?.id;
                }
            });

            const sectionToScroll = toScrollObj.length
                ? toScrollObj[0].destination?.id
                : null;
            if (sectionToScroll) {
                this.jumpToSection(sectionToScroll);
            } else {
                this.scrollToNext(item);
            }
        } else {
            this.scrollToNext(item);
        }
    }

    private scrollToNext(item: QuestionnaireI): void {
        const currIndex: number = this.questionnaire.findIndex(
            (question) => question.identifier === item.identifier
        );

        if (currIndex + 1 < this.questionnaire.length) {
            const sectionToScroll =
                this.questionnaire[currIndex + 1].identifier;
            this.jumpToSection(sectionToScroll);
        }
    }

    scrollBackTo(item: QuestionnaireI): void {
        if (item.dependency) {
            // if the dependent field has the exact value
            if (
                this.questionnaireForm.get(item.dependency.key)?.value ===
                item.dependency.value
            ) {
                this.jumpToSection(item.dependency.key);
            } else {
                this.scrollToPrevious(item);
            }
        } else {
            this.scrollToPrevious(item);
        }
    }

    private scrollToPrevious(item: QuestionnaireI): void {
        const currIndex: number = this.questionnaire.findIndex(
            (question) => question.identifier === item.identifier
        );

        const sectionToScroll = this.questionnaire[currIndex - 1].identifier;
        this.jumpToSection(sectionToScroll);
    }

    private jumpToSection(sectionToScroll: string): void {
        // enable scroll before jump
        this.toggleScroll(true);
        const toScrollEl = document.getElementById(sectionToScroll);
        try {
            toScrollEl.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.log(sectionToScroll);
            console.log(toScrollEl);
        }

        // disable scroll after jump with a
        // delay to have smooth transition
        setTimeout(() => this.toggleScroll(), 900);
    }

    submit() {
        if (this.questionnaireForm.valid) {
            this.onSucess();
        } else {
            this.onFaliure();
        }
    }

    private onSucess() {
        console.log(JSON.stringify(this.questionnaireForm.value));
        this.snackBar.openSnackBar('Form response has been consoled...');
    }

    private onFaliure() {
        this.snackBar.openSnackBar(
            'You need to fill all the required fields...'
        );
    }
}
