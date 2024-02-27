'use client';

import { useEffect, useState } from 'react';
import { Quiz } from '../../interfaces';
import { useRouter } from 'next/navigation';
import { Button, RadioGroup } from '@/app/components';
import { quizService } from '@/app/services/quizService';
import React from 'react';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [quizzes, setQuizzes] = useState(quizService.questions);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>();
  const router = useRouter();
  const quizIndex = Number(id);
  const isLastIndex = quizIndex >= quizzes.length - 1;

  useEffect(() => {
    setCurrentQuiz(quizzes[quizIndex]);
  }, [quizIndex, quizzes]);

  const onValueChanged = (value: string) => {
    quizService.submitAnswer(quizIndex, value);
    setQuizzes(quizService.questions);
  };

  const onBtnClicked = () => {
    let url = `/quiz/${quizIndex + 1}`;
    if (isLastIndex) {
      url = `/quiz/result`;
      if (!quizService.endTime) quizService.endQuiz();
    }

    router.push(url);
  };

  return (
    currentQuiz && (
      <div className="flex flex-col space-y-3">
        {`문제 [${quizIndex + 1} / ${quizzes.length}]`}
        <div className="flex space-x-1 font-bold">
          <p>Quiz:</p>
          <p dangerouslySetInnerHTML={{ __html: currentQuiz.question }} />
        </div>
        <RadioGroup
          items={currentQuiz.allAnswers}
          value={currentQuiz.userAnswer}
          disabled={currentQuiz.userAnswer ? true : false}
          onSelect={onValueChanged}
        />
        {currentQuiz.userAnswer && (
          <div className="flex flex-col">
            <div className="flex space-x-1 font-bold">
              <p>Answer:</p>
              <p dangerouslySetInnerHTML={{ __html: currentQuiz.correct_answer }} />
            </div>
            <Button onClick={onBtnClicked}>{isLastIndex ? `결과 보기` : `다음 문제`}</Button>
          </div>
        )}
      </div>
    )
  );
}
