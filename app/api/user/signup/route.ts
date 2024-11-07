import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import { genSaltSync, hashSync } from "bcrypt-ts";
const salt = genSaltSync(10);

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log("body", reqBody);

    const existingUser = await client.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 409 } // Conflict status code
      );
    }

    const hash = hashSync(password, salt);
    const user = await client.user.create({
      data: {
        username,
        email,
        password: hash,
      },
      select: {
        id: true,
        username: true,
      },
    });

    return NextResponse.json(
      { user, message: "User created successfully" },
      { status: 201 } // Created status code
    );
  } catch (error) {
    console.error("Error in user creation:", error);
    return NextResponse.json(
      { message: "Error in user creation" },
      { status: 500 } // Internal Server Error status code
    );
  }
};
