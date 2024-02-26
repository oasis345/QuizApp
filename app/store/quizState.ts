import { atom, selector } from 'recoil';
import { Quiz } from '../interfaces';
import { localStorageEffect } from './utils';

export const quizState = atom<Quiz[]>({
  key: 'Quizzes',
  default: [],
  effects: [localStorageEffect('Quizzes')],
});

export const correctQuizzesState = selector({
  key: 'correctQuizzesState',
  get: ({ get }) => get(quizState).filter((quiz) => quiz.userAnswer === quiz.correct_answer),
});

export const incorrectQuizzesState = selector({
  key: 'incorrectQuizzesState',
  get: ({ get }) => get(quizState).filter((quiz) => quiz.userAnswer !== quiz.correct_answer),
});
