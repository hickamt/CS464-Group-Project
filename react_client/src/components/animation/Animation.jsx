import ReactLoading from "react-loading";

// Spinning Load Animation (GH)
export default function SpinAnimation() {
  return (
    <ReactLoading
      className="mx-auto mt-4"
      type="spin"
      color="rgba(11, 127, 171, 0.5)"
      height={100}
      width={100}
    />
  );
}
