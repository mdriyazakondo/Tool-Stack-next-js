import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
const collection = await dbConnect("orders");

export async function PATCH(request, { params }) {
  const { id } = await params;
  const updateBody = await request.json();
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: updateBody,
  };
  const result = (await collection).updateOne(filter, updateDoc);
  return Response.json(result);
}
