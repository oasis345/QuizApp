import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import dynamic from 'next/dynamic';
import { quizService } from '../services/quizService';
const QuizPage = dynamic(() => import('../quiz/[id]/page'), { ssr: false });
import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

// Mocking useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: { id: '0' }, // Mocking query parameter 'id'
  }),
}));

describe('Quiz Page', () => {
  beforeEach(() => {
    // Reset quizService before each test
    quizService.reset();
    // Mocking questions for quizService
    quizService.questions = [
      {
        question: 'What is the capital of France?',
        allAnswers: ['Paris', 'Rome', 'Berlin'],
        incorrect_answers: ['Paris', 'Rome', 'Berlin'],
        correct_answer: 'Paris',
        userAnswer: '',
      },
      {
        question: 'What is the capital of Italy?',
        allAnswers: ['Paris', 'Rome', 'Berlin'],
        incorrect_answers: ['Paris', 'Rome', 'Berlin'],
        correct_answer: 'Rome',
        userAnswer: '',
      },
    ];
  });

  it('renders quiz question and options', async () => {
    render(<QuizPage params={{ id: '0' }} />);

    await waitFor(() => expect(screen.getByText('문제 [1 / 2]')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('What is the capital of France?')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Paris')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Rome')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Berlin')).toBeInTheDocument());
  });

  it('submits answer and moves to next question', async () => {
    render(<QuizPage params={{ id: '0' }} />);

    const parisOption = await waitFor(() => screen.getAllByText('Paris'));
    fireEvent.click(parisOption[0]);

    expect(quizService.questions[0].userAnswer).toBe('Paris');

    // Mocking questions for next question
    quizService.questions[1].userAnswer = 'Rome';

    render(<QuizPage params={{ id: '1' }} />);

    const romeOption = await waitFor(() => screen.getAllByText('Paris'));
    fireEvent.click(romeOption[0]);

    expect(quizService.questions[1].userAnswer).toBe('Rome');
  });
});
