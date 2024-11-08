"use client";
import React from 'react';
import CreateQuiz from '../components/CreateQuiz';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '../components/Navbar';
const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code"); // Fetch the 'code' query parameter from the URL

  return (
    <div>
      <Navbar/>
      <CreateQuiz code={code || ''} subject="Computer Science" />
    </div>
  );
};

export default Page;
