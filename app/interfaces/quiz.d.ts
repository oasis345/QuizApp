export interface Quiz {
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  category: number;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  allAnswers: string[];
  userAnswer: string;
}
