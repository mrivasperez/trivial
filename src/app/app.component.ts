import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { CATEGORIES, DIFFICULTY, QUESTION_TYPES } from '../data/options';
@Component({
  selector: 'app-root',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatSliderModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'trivial';
  categoryOptions = CATEGORIES;
  difficultyOptions = DIFFICULTY;
  questionTypeOptions = QUESTION_TYPES;
  numberOfQuestions: number = 5;
}
