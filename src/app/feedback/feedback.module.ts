import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import { FeedbackItemComponent } from './feedback-list/feedback-item/feedback-item.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        RadioButtonModule,
        CheckboxModule,
        InputTextareaModule,
        ButtonModule
    ],
    declarations: [
        FeedbackComponent,
        FeedbackFormComponent,
        FeedbackListComponent,
        FeedbackItemComponent
    ]
})
export class FeedbackModule {}
