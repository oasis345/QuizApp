'use client';

import { useRecoilState } from 'recoil';
import { quizState } from '../../store/quizState';
import { useEffect, useState } from 'react';
import { Quiz } from '../../interfaces';
import { useRouter } from 'next/navigation';
import { Button, RadioGroup } from '@/app/components';
import _ from 'lodash';
import { timeRangeState } from '@/app/store/timeRangeState';
import { dayjs } from '@/app/utils';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [quizzes, setQuizzes] = useRecoilState(quizState);
  const [timeRange, setTimeRange] = useRecoilState(timeRangeState);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>();
  const router = useRouter();
  const quizIndex = Number(id);
  const isLastIndex = quizIndex >= quizzes.length - 1;

  useEffect(() => {
    setCurrentQuiz(quizzes[quizIndex]);
  }, [quizIndex, quizzes]);

  const onValueChanged = (value: string) => {
    const updatedQuizList = _.cloneDeep(quizzes);
    const updatedQuiz = _.cloneDeep(currentQuiz);

    updatedQuizList[quizIndex].userAnswer = value;
    updatedQuiz!.userAnswer = value;

    setCurrentQuiz(updatedQuiz);
    setQuizzes(updatedQuizList);
  };

  const onBtnClicked = () => {
    let url = `/quiz/${quizIndex + 1}`;
    if (isLastIndex) {
      url = `/quiz/result`;

      if (!timeRange.endTime) {
        const endTime = dayjs().unix();
        setTimeRange((timeRange) => ({
          startTime: timeRange.startTime,
          endTime: endTime,
        }));
      }
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
