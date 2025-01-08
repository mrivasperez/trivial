import { Component } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CATEGORIES, DIFFICULTY, QUESTION_TYPES } from '../../data/options';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-options',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
  ],
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.css',
})
export class GameOptionsComponent {
  categoryOptions = CATEGORIES;
  difficultyOptions = DIFFICULTY;
  questionTypeOptions = QUESTION_TYPES;
  numberOfQuestions: number = 5;

  selectedCategory: number = 0;
  selectedDifficulty: string | number = 0;
  selectedQuestionType: string | number = 0;

  constructor(private router: Router) {}

  onSelectCategory(event: MatSelectChange) {
    this.selectedCategory = event.value;
  }

  onSelectDifficulty(event: MatSelectChange) {
    this.selectedDifficulty = event.value;
  }

  onSelectQuestionType(event: MatSelectChange) {
    this.selectedQuestionType = event.value;
  }

  onSelectNumberOfQuestions(event: Event) {
    const input = event.target as HTMLInputElement;
    this.numberOfQuestions = Number(input.value);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const queryParams = {
      amount: this.numberOfQuestions,
      ...(this.selectedCategory !== 0 && { category: this.selectedCategory }),
      ...(this.selectedDifficulty !== 0 && {
        difficulty: this.selectedDifficulty,
      }),
      ...(this.selectedQuestionType !== 0 && {
        type: this.selectedQuestionType,
      }),
    };

    this.router.navigate(['/game'], { queryParams });
  }
}
