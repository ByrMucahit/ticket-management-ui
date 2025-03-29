import axios from "axios";
import { MultiResponseI, ResponseI, TravelResponseI } from "../interfaces";


function baseProvider() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}


export async function findTravels(): Promise<TravelResponseI[] | []> {
  const provider = baseProvider();
  return provider
    .get(`/travels`)
    .then((response: MultiResponseI) => {
      if (response.status === 200 || response.status === 201) {
        return response.data as TravelResponseI[];
      }
      throw new Error("Failed to fetch invoices");
    })
    .catch((err) => {
      console.log("err: ", err);
      throw err;
    });
}

export async function findTravelById(id: string): Promise<TravelResponseI> {
  const provider = baseProvider();
  console.log('providers2: ', provider);
  return provider
    .get(`/travels/${id}`)
    .then((response: ResponseI) => {
      if (response.status === 200 || response.status === 201) {
        return response.data as TravelResponseI;
      }
      throw new Error("Failed to fetch invoices");
    })
    .catch((err) => {
      console.log("err: ", err);
      throw err;
    });
}