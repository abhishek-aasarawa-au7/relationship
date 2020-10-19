import mongoose, { Schema } from "mongoose";

// making schema
const relationSchema = Schema;

// defining schema
const relation = new relationSchema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  relationWith: [{ type: Schema.Types.ObjectId, ref: "Relation" }],
  relation: [
    {
      type: String,
    },
  ],
});

// creating model
const relationModel = mongoose.model("Relation", relation);

export default relationModel;
