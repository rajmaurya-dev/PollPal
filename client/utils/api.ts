import axios from "axios";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await axios.post("/users", data);
  return response.data;
};
