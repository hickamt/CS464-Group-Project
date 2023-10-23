
import ReactLoading from "react-loading";

// Loading animation (GH)
export const spinAnimation = function reactSpinLoadingAnimation() {
  return (
    <ReactLoading
      className="mx-auto"
      type="spin"
      color="#4a4537"
      height={100}
      width={100}
    />
  );
};
