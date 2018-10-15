import { Component, OnInit } from '@angular/core';
import { Feedback } from '../entities/feedback';
import { FeedbackService } from '../feedback.service';

@Component({
    selector: 'app-feedback-list',
    templateUrl: './feedback-list.component.html',
    styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {
    public feedbacks: Feedback[] = null;

    constructor(private feedbackService: FeedbackService) {}

    ngOnInit(): void {
        this.getFeedbacks();
    }

    public getFeedbacks(): void {
        this.feedbackService
            .getFeedbacks()
            .subscribe((feedbacks: Feedback[]) => {
                this.feedbacks = feedbacks;
            });
    }
}
