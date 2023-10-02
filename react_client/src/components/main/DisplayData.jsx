export function DisplayData({data}) {
  return data.map((item) => {
    {
      return <h1>{item}</h1>;
    }
  });
}
