import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { QuestionnaireI } from './../../interfaces/interfaces';
import questionnaireJson from './../../../assets/questionnaire.json';
import { SelectionType } from './../../constants/selectionType';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
    selector: 'app-questionnaire-v2',
    templateUrl: './questionnaire-v2.component.html',
    styleUrls: ['./questionnaire-v2.component.scss']
})
export class QuestionnaireV2Component implements OnInit {
    questionnaireForm: FormGroup;
    questionnaire: QuestionnaireI[];

    get selectionType(): typeof SelectionType {
        return SelectionType;
    }

    constructor(private fb: FormBuilder, private snackBar: SnackBarService) {
        this.questionnaire = questionnaireJson.questionnaire.questions;
        this.questionnaireForm = this.fb.group({});
    }

    ngOnInit(): void {
        this.enableScroll();
        this.setControlsDependencies();
        this.createFormControls(this.questionnaire);
    }

    private enableScroll(): void {
        const bodyEl = document.querySelector('body');
        bodyEl.classList.remove('stop-scrolling');
    }

    private setControlsDependencies(): void {
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
        for (let control of controls) {
            const newFormControl = new FormControl();

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
        if (item.jumps?.length) {
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
        const toScrollEl = document.getElementById(sectionToScroll);
        try {
            toScrollEl.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.log(error);
        }
    }

    submit() {
        if (this.questionnaireForm.valid) {
            console.log(this.questionnaireForm.value);
        } else {
            this.snackBar.openSnackBar(
                'You need to fill all the required fields...'
            );
        }
    }
}
