'use client';

import { useEffect } from 'react';
import { BarChart, Button } from '@/app/components';
import { useRouter } from 'next/navigation';
import { quizService } from '@/app/services/quizService';
import React from 'react';

export default function Page() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [chartData, setChartData] = React.useState<any[]>([]);
  const { correctQuizzes, incorrectQuizzes, durationTime } = quizService;
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    setChartData([
      { key: '정답 개수', value: correctQuizzes.length },
      { key: '오답 개수', value: incorrectQuizzes.length },
    ]);
  }, []);

  return (
    isMounted && (
      <div className="flex flex-col w-full">
        <span>{`소요 시간: ${durationTime.minutes}분 ${durationTime.seconds}초`}</span>
        <span>{`정답 개수: ${correctQuizzes.length}`}</span>
        <span>{`오답 개수: ${incorrectQuizzes.length}`}</span>
        <BarChart data={chartData} title="차트" keyField="key" valueField="value" />
        <div className="flex">
          <Button className="w-full" onClick={() => router.push('/quiz/notes')}>
            오답 노트 보기
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              quizService.reset();
              router.push('/');
            }}
          >
            새로 시작
          </Button>
        </div>
      </div>
    )
  );
}
