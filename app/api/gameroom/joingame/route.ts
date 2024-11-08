import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    let { code, userId } = reqBody;
    console.log(reqBody);

    // Parse userId to integer
    userId = Number.parseInt(userId);
    
    // Check if userId is valid
    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "Invalid userId" },
        { status: 400 }
      );
    }

    console.log("Parsed userId:", userId);

    // Attempt to update user with the parsed userId
    const user = await client.user.update({
      where: {
        id: userId,
      },
      data: {
        gameId: code,
      },
    });

    return NextResponse.json(
      { user, message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in joining room:", error);
    return NextResponse.json(
      { message: "Error in joining room" },
      { status: 500 }
    );
  }
};
