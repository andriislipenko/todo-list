import { Injectable } from '@angular/core';
import { Feedback } from './entities/feedback';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    private _feedbacks: Feedback[] = [];
    private feedbacksSubject = new BehaviorSubject<Feedback[]>(this.feedbacks);

    constructor() {}

    public getFeedbacks(): Observable<Feedback[]> {
        this.updateFeedbacks();
        return this.feedbacksSubject.asObservable();
    }

    public saveFeedback(feedback: Feedback): void {
        // feedback.feedback = feedback.feedback.replace(/(?:\r\n|\r|\n)/g, '<br>');
        this.feedbacks = this.feedbacks.concat(feedback);
        this.updateFeedbacks();
    }

    private updateFeedbacks(): void {
        this.feedbacksSubject.next(this.feedbacks);
    }

    private saveFeedbacksToLocalStorage(feedbacks: Feedback[]): void {
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }

    private getFeedbacksFromLocalStorage(): Feedback[] {
        const feedbacksString = localStorage.getItem('feedbacks');

        if (!feedbacksString) {
            this._feedbacks = [];
            return this._feedbacks;
        }

        this._feedbacks = JSON.parse(feedbacksString);
        return this._feedbacks;
    }

    set feedbacks(feedbacks: Feedback[]) {
        this._feedbacks = feedbacks;
        this.saveFeedbacksToLocalStorage(this._feedbacks);
    }

    get feedbacks(): Feedback[] {
        this._feedbacks = this.getFeedbacksFromLocalStorage();
        return this._feedbacks;
    }
}
