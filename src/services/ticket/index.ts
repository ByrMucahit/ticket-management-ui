import axios from "axios";


function baseProvider(userId: string) {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL_BASE_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "user_id": userId
      },
    });
  }

export async function buyTicket(travelId: string, user_id: string): Promise<any> {
  const provider = baseProvider(user_id);
  return provider
    .post(`/tickets/buy/${travelId}`)
    .then((response: any) => {
      if (response.status === 200 || response.status === 201) {
        return response.data as any;
      }
      throw new Error("Failed to fetch invoices");
    })
    .catch((err) => {
      console.log("err: ", err);
      throw err;
    });
}