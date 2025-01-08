import { Component, OnInit } from '@angular/core';
import { OpenTriviaQuestion, OpenTriviaService } from '../open-trivia.service';
import { ActivatedRoute } from '@angular/router';
import { Observer } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-game',
  imports: [MatProgressSpinnerModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  questions: OpenTriviaQuestion[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private openTriviaService: OpenTriviaService
  ) {}

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
