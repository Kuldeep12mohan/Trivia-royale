import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import { genSaltSync, compareSync } from "bcrypt-ts";
const salt = genSaltSync(10);

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await client.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User doesn't exist" }, { status: 404 });
    }

    const isPasswordCorrect = compareSync(password, user.password);

    if (isPasswordCorrect) {
      return NextResponse.json({ message: "User logged in successfully",user });
    } else {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error in signin:", error);
    return NextResponse.json({ message: "Error in user signin" }, { status: 500 });
  }
};
