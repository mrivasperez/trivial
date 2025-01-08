import { Component, OnInit } from '@angular/core';
import { OpenTriviaQuestion, OpenTriviaService } from '../open-trivia.service';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

interface Answer {
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'app-game',
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  questions: OpenTriviaQuestion[] = [];
  currentQuestionIndex = 0;
  loading = true;
  error: string | null = null;
  answers: Answer[] = [];
  selectedAnswer: string | null = null;
  showCorrectAnswer = false;
  score = 0;
  gameOver = false;

  constructor(
    private route: ActivatedRoute,
    private openTriviaService: OpenTriviaService
  ) {}

  loadAnswersForCurrentQuestion() {
    if (this.questions.length > 0) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.selectedAnswer = null;
      this.showCorrectAnswer = false;

      const incorrectAnswers = currentQuestion.incorrect_answers;
      const allAnswers = [...incorrectAnswers, currentQuestion.correct_answer];

      this.answers = allAnswers
        .map((answer) => {
          return {
            text: answer,
            isCorrect: answer === currentQuestion.correct_answer,
            isSelected: false,
          };
        })
        .sort(() => Math.random() - 0.5);
    }
  }

  handleAnswer() {
    if (this.selectedAnswer) {
      this.showCorrectAnswer = true;

      const selected = this.answers.find(
        (answer) => answer.text === this.selectedAnswer
      );

      if (selected?.isCorrect) {
        this.score++;
      }

      setTimeout(() => {
        this.nextQuestion();
      }, 2000);
    }
  }

  nextQuestion() {
    this.showCorrectAnswer = false;
    this.selectedAnswer = null;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.questions.length) {
      this.loadAnswersForCurrentQuestion();
    } else {
      this.gameOver = true;
      console.log('Game Over! Total Score:', this.score);
    }
  }

  selectAnswer(answer: string) {
    console.log(answer);
    this.selectedAnswer = answer;
    this.answers = this.answers.map((a) => ({
      ...a,
      isSelected: a.text === answer,
    }));
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const amount = Number(params['amount'] || 10);
      const category = Number(params['category'] || 0);
      const difficulty = params['difficulty'] || 0;
      const type = params['type'] || 0;

      this.loading = true;
      this.error = null;

      const observer: Observer<any> = {
        next: (response) => {
          this.questions = response.results;
          this.loading = false;
          this.loadAnswersForCurrentQuestion();
          console.log(response);
        },
        error: (error) => {
          this.error = 'Failed to load trivia questions.';
          this.loading = false;
          console.error('API Error:', error);
        },
        complete: () => {},
      };

      this.openTriviaService
        .getTriviaQuestions(amount, category, difficulty, type)
        .subscribe(observer);
    });
  }
}
