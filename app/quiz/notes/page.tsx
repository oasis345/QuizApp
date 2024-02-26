'use client';
import { useRecoilValue } from 'recoil';
import { incorrectQuizzesState } from '../../store/quizState';
import { Button, RadioGroup } from '@/app/components';
import _ from 'lodash';
import React, { useEffect } from 'react';

export default function Page() {
  const incorrectQuizzes = useRecoilValue(incorrectQuizzesState);
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <div className="container flex flex-col space-y-5">
        {incorrectQuizzes.map((quiz) => (
          <div key={quiz.question} className="space-y-2">
            <div className="flex">
              <span>Quiz:</span> <div dangerouslySetInnerHTML={{ __html: quiz.question }} />
            </div>
            <RadioGroup items={quiz.allAnswers} value={quiz.userAnswer} disabled={quiz.userAnswer ? true : false} />
          </div>
        ))}
      </div>
    )
  );
}
