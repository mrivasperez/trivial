import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
