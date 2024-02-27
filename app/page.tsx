'use client';
import React from 'react';
import { Button, Select, Input } from './components';
import { CATEGORY_MAP, DIFFICULTY_MAP, QUIZ_TYPE_MAP } from './model';
import { useRouter } from 'next/navigation';
import { Quiz } from './interfaces';
import { quizService } from './services/quizService';

export default function Home() {
  const [category, setCategory] = React.useState<Quiz['category'] | null>(null);
  const [difficulty, setDifficulty] = React.useState<Quiz['difficulty'] | null>(null);
  const [quizType, setQuizType] = React.useState<Quiz['type'] | null>(null);
  const [amount, setAmount] = React.useState(5);
  const router = useRouter();

  const onBtnClicked = async () => {
    await quizService.loadQuestion({ amount, category, difficulty, type: quizType });
    quizService.startQuiz();
    router.push('quiz/0');
  };

  return (
    <div className="flex flex-col items-center space-y-5">
      <p className="font-bold">카테고리, 난이도 문제 개수,등을 선택하여 퀴즈를 시작하세요</p>
      <div className="flex-col w-full space-y-5">
        <Select
          items={CATEGORY_MAP}
          value={category}
          keyField="id"
          labelField="name"
          onSelect={(value: number) => setCategory(value)}
        />
        <Select
          items={DIFFICULTY_MAP}
          value={difficulty}
          keyField="key"
          labelField="label"
          onSelect={(value: Quiz['difficulty']) => setDifficulty(value)}
        />
        <Select
          items={QUIZ_TYPE_MAP}
          value={quizType}
          keyField="key"
          labelField="label"
          onSelect={(value: Quiz['type']) => setQuizType(value)}
        />
        <Input
          type="number"
          className="w-full"
          value={amount}
          min={1}
          max={50}
          onValueChange={(value) => setAmount(value as number)}
        />
        <Button className="w-full" color="white" onClick={onBtnClicked}>
          퀴즈 풀기
        </Button>
      </div>
    </div>
  );
}
