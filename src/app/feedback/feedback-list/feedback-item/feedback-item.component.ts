import { Component, OnInit, Input } from '@angular/core';
import { Feedback } from '../../entities/feedback';

@Component({
    selector: 'app-feedback-item',
    templateUrl: './feedback-item.component.html',
    styleUrls: ['./feedback-item.component.scss']
})
export class FeedbackItemComponent implements OnInit {
    @Input() feedback: Feedback;

    constructor() {}

    ngOnInit() {}
}
