import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { questionText, options, correctOption, code } = reqBody;
    console.log(reqBody)
    // Ensure gameroomCode is provided
    if (!code) {
      return NextResponse.json({ message: "Game room code is required" }, { status: 400 });
    }

    // Create the question and link it to the game room using gameroomCode
    const question = await client.question.create({
      data: {
        text:questionText,
        options,
        correctAnswer:correctOption,
        gameroomCode:code
      },
    });

    // Return the created question data
    return NextResponse.json(question, { status: 201 });

  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json({ message: "Error creating question" }, { status: 500 });
  }
};
