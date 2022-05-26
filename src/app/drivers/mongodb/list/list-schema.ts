import { Schema } from 'mongoose';

const ListSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    itens: [
      {
        name: {
          type: String,
          required: true,
        },
        finished: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
    description: {
      type: String,
      required: false,
    },
    createdBy: {
      type: String,
      required: true,
    },
    sharedWith: {
      users: [
        {
          uuid: {
            type: String,
            required: false,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

export default ListSchema;
