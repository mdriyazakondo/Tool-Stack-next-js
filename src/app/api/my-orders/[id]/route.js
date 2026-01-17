import { ObjectId } from "mongodb";
const { dbConnect } = require("@/lib/dbConnect");

const collection = await dbConnect("orders");

export async function GET(request, { params }) {
  const { id } = await params;
  const filter = { _id: new ObjectId(id) };
  const result = await collection.findOne(filter);
  return Response.json(result);
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const updateBody = await request.json();
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: updateBody,
  };
  const result = await collection.updateOne(filter, updateDoc);
  return Response.json(result);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const filter = { _id: new ObjectId(id), email: email };
  const result = await collection.deleteOne(filter);
  return Response.json(result);
}
