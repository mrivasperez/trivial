import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { CATEGORIES, DIFFICULTY, QUESTION_TYPES } from '../data/options';
@Component({
  selector: 'app-root',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
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

  selectedCategory: number = 0;
  selectedDifficulty: string = '';
  selectedQuestionType: string = '';

  onSelectCategory(event: MatSelectChange) {
    this.selectedCategory = event.value;
  }

  onSelectDifficulty(event: MatSelectChange) {
    this.selectedDifficulty = event.value;
  }

  onSelectQuestionType(event: MatSelectChange) {
    this.selectedQuestionType = event.value;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    alert('Form Submitted');

    console.log(this.selectedCategory);
    console.log(this.selectedDifficulty);
  }
}
