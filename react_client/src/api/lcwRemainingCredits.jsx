// Returns live coin watch remaining credits
export default async function lcwRemainingCredits() {
  return await fetch(new Request("https://api.livecoinwatch.com/credits"), {
    method: "POST",
    header: new Headers({
      "content-type": "application/json",
      "x-api-key": import.meta.env.VITE_LCW_API_KEY,
    }),
  }).then(async (response) => {
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson && (await response.json());
    console.log("Remaining Credits: ", data)

    if (!response.ok) {
      const error = (data && data.message) || response.status;
      return Promise.reject(error);
    }
    // console.table("LiveCoinWatch Remaining Credits: ", data);
    return data;
  });
}
