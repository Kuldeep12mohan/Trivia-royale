"use client"
import React from 'react'
import { Navbar } from '../components/Navbar'
import QuizComponent from '../components/QuizComponent'
const page = () => {
  return (
    <div>
      <Navbar/>
      <br /><br />
      <QuizComponent/>
    </div>
  )
}

export default page