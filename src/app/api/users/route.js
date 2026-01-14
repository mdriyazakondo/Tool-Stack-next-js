import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
const userRes = await dbConnect("users");

export async function POST(request) {
  const newUser = await request.json();

  const existUser = await userRes.findOne({ email: newUser.email });

  if (existUser) {
    return Response.json({ message: "User already exists" }, { status: 409 });
  }

  const hashPassword = await bcrypt.hash(newUser.password, 10);

  const user = await userRes.insertOne({ ...newUser, password: hashPassword });

  return Response.json(
    { user, message: "User created successfully" },
    { status: 201 }
  );
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const user = await userRes.findOne({ email });
  return Response.json(
    { user, message: "User created successfully" },
    { status: 200 }
  );
}
