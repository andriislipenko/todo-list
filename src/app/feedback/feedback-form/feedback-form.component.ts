import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FeedbackService } from '../feedback.service';

@Component({
    selector: 'app-feedback-form',
    templateUrl: './feedback-form.component.html',
    styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
    public feedbackForm = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        feedback: new FormControl(),
        gender: new FormControl('male'),
        agreement: new FormControl(false)
    });

    constructor(private feedbackService: FeedbackService) {}

    ngOnInit() {}

    public onSubmit(): void {
        this.feedbackService.saveFeedback(this.feedbackForm.value);
    }
}
