import { TestBed } from '@angular/core/testing';
import { MaterialUiModule } from '../modules/material-ui.module';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
    let service: SnackBarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialUiModule]
        });
        service = TestBed.inject(SnackBarService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
