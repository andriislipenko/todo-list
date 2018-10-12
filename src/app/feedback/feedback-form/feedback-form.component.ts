import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { FeedbackService } from '../feedback.service';

@Component({
    selector: 'app-feedback-form',
    templateUrl: './feedback-form.component.html',
    styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
    public feedbackForm = this.fb.group({
        firstName: ['', [Validators.maxLength(25), this.containsText()]],
        lastName: ['', [Validators.maxLength(30)]],
        feedback: ['', [Validators.maxLength(500), this.containsText()]],
        gender: ['male'],
        agreement: [false, Validators.requiredTrue]
    });

    constructor(
        private feedbackService: FeedbackService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {}

    public onSubmit(): void {
        this.feedbackService.saveFeedback(this.feedbackForm.value);
        this.feedbackForm.reset();
        this.feedbackForm.patchValue({
            gender: 'male',
            agreement: false
        });
    }

    private containsText(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            return control.value.trim() ? null : { 'containsText': true };
        };
    }

    get firstName(): AbstractControl {
        return this.feedbackForm.get('firstName');
    }

    get lastName(): AbstractControl {
        return this.feedbackForm.get('lastName');
    }

    get feedback(): AbstractControl {
        return this.feedbackForm.get('feedback');
    }

    get agreement(): AbstractControl {
        return this.feedbackForm.get('agreement');
    }
}
