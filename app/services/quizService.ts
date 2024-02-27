import _ from 'lodash';
import { Quiz } from '../interfaces';
import { dayjs } from '../utils';
import { httpService } from './httpService';
import { localStorageService } from './localStorageService';

class QuizService {
  private readonly API_URL = `https://opentdb.com/api.php`;
  private _questions: Quiz[] = [];
  private _startTime: number = 0;
  private _endTime: number = 0;

  constructor() {
    this._questions = localStorageService.get('Quizzes');
    this._startTime = localStorageService.get('StartTime');
    this._endTime = localStorageService.get('EndTime');
  }

  get questions() {
    return this._questions;
  }

  set questions(value: Quiz[]) {
    localStorageService.set('Quizzes', value);
    this._questions = value;
  }

  get startTime() {
    return this._startTime;
  }

  set startTime(value: number) {
    localStorageService.set('StartTime', value);
    this._startTime = value;
  }

  get endTime() {
    return this._endTime;
  }

  set endTime(value: number) {
    localStorageService.set('EndTime', value);
    this._endTime = value;
  }

  get correctQuizzes() {
    return this.questions?.filter?.((quiz) => quiz.userAnswer === quiz.correct_answer);
  }

  get incorrectQuizzes() {
    return this.questions?.filter?.((quiz) => quiz.userAnswer !== quiz.correct_answer);
  }

  get durationTime() {
    const duration = dayjs(this.endTime).diff(this.startTime);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return { minutes, seconds };
  }

  async loadQuestion({
    amount = 5,
    category,
    difficulty,
    type,
  }: {
    category?: Quiz['category'] | null;
    difficulty?: Quiz['difficulty'] | null;
    type?: Quiz['type'] | null;
    amount?: number;
  }) {
    const response = await httpService.get({
      url: this.API_URL,
      params: {
        category,
        amount,
        difficulty,
        type,
      },
    });

    this.questions = response.results.map((item: Quiz) => ({
      ...item,
      allAnswers: [item.correct_answer, ...item.incorrect_answers].sort(() => Math.random() - 0.5),
      userAnswer: '',
    }));
  }

  submitAnswer(index: number, answer: string) {
    const updatedQuizList = _.cloneDeep(this._questions);
    updatedQuizList[index].userAnswer = answer;
    this.questions = updatedQuizList;
  }

  startQuiz() {
    this.startTime = dayjs().unix();
  }

  endQuiz() {
    this.endTime = dayjs().unix();
  }

  reset() {
    this.questions = [];
    this.startTime = 0;
    this.endTime = 0;
  }
}

export const quizService = new QuizService();
