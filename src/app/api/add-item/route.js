import { dbConnect } from "@/lib/dbConnect";
const collection = await dbConnect("add-items");

export async function GET(request) {
  const result = await collection.find({}).toArray();
  return Response.json(result);
}

export async function POST(request) {
  try {
    const body = await request.json();
    body.date = new Date();
    const result = await collection.insertOne(body);
    return Response.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("API Error:", error.message);

    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
