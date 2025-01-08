import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface OpenTriviaQuestion {
  type: 'boolean' | 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface OpenTriviaResponse {
  response_code: number;
  results: OpenTriviaQuestion[];
}

@Injectable({
  providedIn: 'root',
})
export class OpenTriviaService {
  private apiUrl = 'https://opentdb.com/api.php';
  constructor(private http: HttpClient) {}

  getTriviaQuestions(
    amount: number,
    category?: number,
    difficulty?: string | number,
    type?: string | number
  ): Observable<OpenTriviaResponse> {
    console.log(amount, category, difficulty, type);
    let params = new HttpParams().set('amount', amount);

    if (category && category !== 0) {
      params = params.set('category', category);
    }
    if (difficulty && difficulty !== 0) {
      params = params.set('difficulty', difficulty);
    }
    if (type && type !== 0) {
      params = params.set('type', type);
    }

    return this.http.get<OpenTriviaResponse>(this.apiUrl, { params });
  }
}
