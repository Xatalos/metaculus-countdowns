import { useEffect, useState } from 'react';
import type { MetaculusQuestion } from '../types';
import { getTimeLeft } from '../utils/countdown';

interface Props {
  question: MetaculusQuestion;
}

export function CountdownCard({ question }: Props) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(question.medianDate));

  // Update every second now (for live seconds)
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(question.medianDate));
    }, 1000);

    return () => clearInterval(id);
  }, [question.medianDate]);

  const url = `https://www.metaculus.com/questions/${question.id}/`;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <article className="card">
      {question.category && <span className="tag">{question.category}</span>}

      <h2>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {question.title}
        </a>
      </h2>

      <div className="countdown">
        {timeLeft.isPast ? (
          <p className="past">Median date has passed</p>
        ) : (
          <>
            <div className="unit">
              <span className="number">{timeLeft.years}</span>
              <span className="label">years</span>
            </div>
            <div className="unit">
              <span className="number">{timeLeft.months}</span>
              <span className="label">months</span>
            </div>
            <div className="unit">
              <span className="number">{timeLeft.days}</span>
              <span className="label">days</span>
            </div>
            <div className="unit time">
              <span className="number">
                {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
              </span>
              <span className="label">h : m : s</span>
            </div>
          </>
        )}
      </div>

      <p className="median">
        Community median:{' '}
        {new Date(question.medianDate).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </article>
  );
}