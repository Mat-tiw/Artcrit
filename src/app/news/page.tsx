"use client"
import { useEffect,useState } from 'react';
import TestUi from '../components/ui/testui';

const News = () => {
  const [status, setStatus] = useState<string|null|undefined>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStatus(localStorage.getItem('token'))
    }
  }, [status]);
  console.log(status)
  return (
    <>
      <TestUi
        title="test title"
        content="New Yorkers are facing the winter chill with less warmth this year as
          the citys most revered soup stand unexpectedly shutters, following a
          series of events that have left the community puzzled New Yorkers are facing the winter chill with less warmth this year as
          the citys most revered soup stand unexpectedly shutters, following a
          series of events that have left the community puzzled New Yorkers are facing the winter chill with less warmth this year as
          the citys most revered soup stand unexpectedly shutters, following a
          series of events that have left the community puzzled."
      />
    </>
  );
};

export default News;
