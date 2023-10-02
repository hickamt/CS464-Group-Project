import animation from "../../assets/postgresql_giphy.gif"
/**
 * Function to produce animation during API request.
 * Requires: const [fetchAnimation, setFetchAnimation] = useState(false)
 * for the switch between true/false
 * @returns the animation while an api call is being made
 */
export const FetchAnimation = () => {
  // document.getElementById("root").style.background = "URL(https://giphy.com/gifs/cat-kitten-computer-3oKIPnAiaMCws8nOsE)";
  return (
    <div className="giphy-container text-center my-5">
      <iframe
        src={animation}
        width="200"
        height="200"
        className="giphy-embed"
        allowFullScreen></iframe>
    </div>
  );
};

/**
 * GIF Created by: Todd Hickam
 * gif is located in ../assets/postgresql_giphy.gif
 * Also uploaded to giphy.com as URL: https://www.youtube.com/watch?v=ccA2jx3wJIc
 */
