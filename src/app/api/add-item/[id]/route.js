import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
const collection = await dbConnect("add-items");

export async function GET(request, { params }) {
  const { id } = await params;
  const filter = { _id: new ObjectId(id) };
  const result = await collection.findOne(filter);
  return Response.json(result);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const filter = { _id: new ObjectId(id) };
  const updateItem = await request.json();
  const updateDoc = { $set: updateItem };
  console.log(updateItem);
  const result = await collection.updateOne(filter, updateDoc);
  console.log(result);
  return Response.json({
    success: true,
    insertedId: result.acknowledged,
  });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const filter = { _id: new ObjectId(id) };
  const result = await collection.deleteOne(filter);
  return Response.json(result);
}
