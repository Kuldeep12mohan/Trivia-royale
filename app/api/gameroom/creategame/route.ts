import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    let { code,userId } = reqBody;
    console.log(reqBody)
    userId = Number.parseInt(userId);
    console.log(typeof(userId));
    // Create a new game room
    const gameRoom = await client.gameRoom.create({
      data: {
        code,
      },
    });
    const user = await client.user.update({
      where:{
        id:userId
      },
      data:{
        gameId:code
      }
    })
    console.log(user);
    return NextResponse.json({
      gameRoom,
      message: "Room created",
    }, { status: 201 });

  } catch (error) {
    console.error("Error in creating room:", error);
    return NextResponse.json({ message: "Error in creating room" }, { status: 500 });
  }
};
