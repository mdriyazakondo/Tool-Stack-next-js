import { dbConnect } from "@/lib/dbConnect";

const collection = await dbConnect("orders");

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const result = await collection.find({ ownerEmail: email }).toArray();
  return Response.json(result);
}
