import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../shared/services/common/http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QuestionnaireI } from 'src/app/interfaces/interfaces';
@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
    questionnaire$: Observable<QuestionnaireI[]>;

    constructor(private http: HttpService) {}

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.questionnaire$ = this.getQuestionnaire();
    }

    private getQuestionnaire(): Observable<QuestionnaireI[]> {
        return this.http
            .get('./assets/questionnaire.json')
            .pipe(
                map(
                    (questionnaire: any) =>
                        questionnaire.questionnaire.questions
                )
            );
    }
}
