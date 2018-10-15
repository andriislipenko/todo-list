import { Component, Input } from '@angular/core';
import { Feedback } from '../../entities/feedback';

@Component({
    selector: 'app-feedback-item',
    templateUrl: './feedback-item.component.html',
    styleUrls: ['./feedback-item.component.scss']
})
export class FeedbackItemComponent{
    @Input() feedback: Feedback;

    constructor() {}
}
