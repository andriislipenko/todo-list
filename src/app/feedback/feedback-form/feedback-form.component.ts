import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { FeedbackService } from '../feedback.service';

@Component({
    selector: 'app-feedback-form',
    templateUrl: './feedback-form.component.html',
    styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
    private readonly FEEDBACK_FROM_INIT_VALUE = {
        firstName: '',
        lastName: '',
        feedback: '',
        gender: 'male',
        agreement: false
    };

    public feedbackForm = this.fb.group({
        firstName: ['', [Validators.maxLength(25), this.containsText()]],
        lastName: ['', [Validators.maxLength(30)]],
        feedback: ['', [Validators.maxLength(500), this.containsText()]],
        gender: ['male'],
        agreement: [false, Validators.requiredTrue]
    });

    public validationErrors: {[key: string]: ValidationErrors} = {};

    constructor(
        private feedbackService: FeedbackService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {}

    public onSubmit(): void {
        if (this.feedbackForm.invalid) {
            this.setErrors(this.feedbackForm);
            console.log(this.validationErrors);
            return;
        }
        this.validationErrors = {};

        this.feedbackService.saveFeedback(this.feedbackForm.value);
        this.feedbackForm.reset(this.FEEDBACK_FROM_INIT_VALUE);
    }

    private containsText(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            return control.value.trim() ? null : { 'containsText': true };
        };
    }

    private setErrors(form: FormGroup): void {
        this.validationErrors = {};

        for (const control in form.controls) {
            if (form.controls.hasOwnProperty(control)) {
                this.validationErrors[control] = form.controls[control].errors;
            }
        }
    }
}
