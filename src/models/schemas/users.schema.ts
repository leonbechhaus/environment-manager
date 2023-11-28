const UsersSchema = {
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
};

export default UsersSchema;
