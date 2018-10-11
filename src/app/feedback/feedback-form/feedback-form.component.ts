import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from '../feedback.service';

@Component({
    selector: 'app-feedback-form',
    templateUrl: './feedback-form.component.html',
    styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
    public feedbackForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
        feedback: ['', Validators.required],
        gender: ['male'],
        agreement: [false]
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
}
