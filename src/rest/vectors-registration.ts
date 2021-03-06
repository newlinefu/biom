import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:9000"
});

const registration = async (logs: any) => {
  const response = await request.post("/v1/registration-with-vector-information", logs);
  return response.data;
};

const authorization = async (data: any) => {
  const response = await request.post("/v1/authorize", data);
  return response.data;
}

export { registration, authorization };
