import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const collection = await dbConnect("add-items");

    const result = await collection
      .find({})
      .sort({ date: -1 })
      .limit(8)
      .toArray();

    return Response.json(result);
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
