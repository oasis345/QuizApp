'use client';

import { correctQuizzesState, incorrectQuizzesState } from '@/app/store/quizState';
import { timeRangeState } from '@/app/store/timeRangeState';
import { useRecoilValue } from 'recoil';
import { dayjs } from '@/app/utils';
import { useEffect } from 'react';
import { BarChart, Button } from '@/app/components';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [chartData, setChartData] = React.useState<any[]>([]);
  const correctQuizzes = useRecoilValue(correctQuizzesState);
  const incorrectQuizzes = useRecoilValue(incorrectQuizzesState);
  const timeRange = useRecoilValue(timeRangeState);
  const duration = dayjs(timeRange.endTime).diff(timeRange.startTime);
  const router = useRouter();
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = duration % 60;

  useEffect(() => {
    setIsMounted(true);
    setChartData([
      { key: '정답 개수', value: correctQuizzes.length },
      { key: '오답 개수', value: incorrectQuizzes.length },
    ]);
  }, []);

  return (
    isMounted && (
      <div className="container flex flex-col">
        <span>{`소요 시간: ${durationMinutes}분 ${durationSeconds}초`}</span>
        <span>{`정답 개수: ${correctQuizzes.length}`}</span>
        <span>{`오답 개수: ${incorrectQuizzes.length}`}</span>
        <BarChart data={chartData} title="차트" keyField="key" valueField="value" />
        <Button
          onClick={() => {
            router.push('/quiz/notes');
          }}
        >
          오답 노트 보기
        </Button>
      </div>
    )
  );
}
