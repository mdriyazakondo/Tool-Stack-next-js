import { dbConnect } from "@/lib/dbConnect";

export async function GET(request) {
  const userCollection = await dbConnect("users");
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) return new Response(JSON.stringify({ message: "Email missing" }));

  const user = await userCollection.findOne({ email });

  if (!user) return new Response(JSON.stringify({ message: "User not found" }));

  // If the user is admin, return all users
  if (user.role === "admin") {
    const allUsers = await userCollection.find({}).toArray();
    return new Response(JSON.stringify({ users: allUsers }));
  }

  // Otherwise return only the logged-in user
  return new Response(JSON.stringify({ user }));
}
