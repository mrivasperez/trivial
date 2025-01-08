import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface OpenTriviaQuestion {
  type: 'boolean' | 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface OpenTriviaResponse {
  response_code: number;
  results: OpenTriviaQuestion[];
}

@Injectable({
  providedIn: 'root',
})
export class OpenTriviaService {
  private apiUrl = 'https://opentdb.com/api.php';
  constructor(private http: HttpClient) {}

  getTriviaQuestion(
    amount: number,
    category?: number,
    difficulty?: string,
    type?: string
  ): Observable<OpenTriviaResponse> {
    let params = new HttpParams().set('amount', amount);

    if (category) {
      params = params.set('category', category);
    }
    if (difficulty) {
      params = params.set('difficulty', difficulty);
    }
    if (type) {
      params = params.set('type', type);
    }

    return this.http.get<OpenTriviaResponse>(this.apiUrl, { params });
  }
}
