import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export const GET = async (request: NextRequest) => {
  try {
    // Retrieve 'code' and 'userId' from query parameters
    const code = request.nextUrl.searchParams.get("code");

    if (!code ) {
      return NextResponse.json({ message: "Missing code " }, { status: 400 });
    }

    // Fetch game room and players using the code
    const gameRoom = await client.gameRoom.findUnique({
      where: {
        code
      },
      select: {
        players: true
      }
    });

    if (!gameRoom) {
      return NextResponse.json({ message: "Game room not found" }, { status: 404 });
    }

    return NextResponse.json({
      gameRoom,
      message: "Room fetched successfully"
    }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching players:", error);
    return NextResponse.json({ message: "Error in fetching players" }, { status: 500 });
  }
};
