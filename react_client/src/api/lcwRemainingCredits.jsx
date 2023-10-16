export default async function lcwRemainingCredits() {
  return await fetch(new Request("https://api.livecoinwatch.com/credits"), {
    method: "POST",
    header: new Headers({
      "content-type": "application/json",
      "x-api-key": "31621381-6652-4c92-a1c1-248823f4557f",
    }),
  }).then(async (response) => {
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson && (await response.json());

    if (!response.ok) {
      const error = (data && data.message) || response.status;
      return Promise.reject(error);
    }
    console.log("LiveCoinWatch Remaining Credits: ", data);
    return data;
  });
}
