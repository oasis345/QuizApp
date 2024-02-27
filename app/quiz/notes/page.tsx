'use client';
import React, { useEffect } from 'react';
import { RadioGroup } from '@/app/components';
import { quizService } from '@/app/services/quizService';
import { Quiz } from '@/app/interfaces';
import _ from 'lodash';

export default function Page() {
  const [incorrectQuizzes, setIncorrectQuizzes] = React.useState<Quiz[]>([]);

  useEffect(() => {
    setIncorrectQuizzes(quizService.incorrectQuizzes);
  }, []);

  return (
    incorrectQuizzes && (
      <div className="flex flex-col space-y-5">
        {incorrectQuizzes.map((quiz) => (
          <div key={quiz.question} className="space-y-3">
            <div className="flex flex-col font-bold space-y-3">
              <div className="flex space-x-1">
                <p>Quiz:</p>
                <p dangerouslySetInnerHTML={{ __html: quiz.question }} />
              </div>
              <div className="flex space-x-1">
                <p>Answer:</p>
                <p dangerouslySetInnerHTML={{ __html: quiz.correct_answer }} />
              </div>
            </div>

            <RadioGroup items={quiz.allAnswers} value={quiz.userAnswer} disabled={quiz.userAnswer ? true : false} />
          </div>
        ))}
      </div>
    )
  );
}
