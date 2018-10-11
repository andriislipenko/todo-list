import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Feedback } from './entities/feedback';
import { FeedbackService } from './feedback.service';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
    constructor(
        private titleService: Title
    ) {}

    ngOnInit() {
        this.titleService.setTitle('Feedback');
    }
}
