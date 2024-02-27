import { quizService } from '../services/quizService';

describe('QuizService', () => {
  beforeEach(() => {
    quizService.reset(); // 각 테스트 전에 퀴즈 서비스 초기화
    quizService.questions = [
      {
        type: 'multiple',
        difficulty: 'easy',
        category: 9,
        question: 'What is the capital of France?',
        correct_answer: 'Paris',
        incorrect_answers: ['Rome', 'Berlin', 'Madrid'],
        allAnswers: ['Paris', 'Rome', 'Berlin', 'Madrid'],
        userAnswer: '',
      },
      {
        type: 'boolean',
        difficulty: 'medium',
        category: 22,
        question: 'The Great Wall of China is visible from space.',
        correct_answer: 'False',
        incorrect_answers: ['True'],
        allAnswers: ['True', 'False'],
        userAnswer: '',
      },
    ];
  });
  it('should submit answer', async () => {
    const quiz = quizService.questions[0];

    quizService.submitAnswer(0, quiz.allAnswers[0]); // 첫 번째 답안 제출
    expect(quizService.questions[0].userAnswer).toBe(quiz.allAnswers[0]); // 제출한 답안 확인
  });

  it('should start and end quiz', () => {
    quizService.startQuiz(); // 퀴즈 시작
    expect(quizService.startTime).not.toBe(0); // 시작 시간이 0이 아닌지 확인

    quizService.endQuiz(); // 퀴즈 종료
    expect(quizService.endTime).not.toBe(0); // 종료 시간이 0이 아닌지 확인
  });

  it('should reset quiz', async () => {
    quizService.startQuiz(); // 퀴즈 시작
    quizService.endQuiz(); // 퀴즈 종료
    quizService.reset(); // 퀴즈 초기화

    expect(quizService.questions.length).toBe(0); // 퀴즈 목록이 비어 있는지 확인
    expect(quizService.startTime).toBe(0); // 시작 시간이 초기화되었는지 확인
    expect(quizService.endTime).toBe(0); // 종료 시간이 초기화되었는지 확인
  });
});
