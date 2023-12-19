import { Link } from "react-router-dom";
const TextWithHover = ({ displayText, active, live, targetLink }) => {
  if (active) {
  }
  return (
    <div className="flex items-center justify-start cursor-pointer">
      {live ? (
        <Link to={targetLink}>
          <div
            className={`${
              active ? "text-white" : "text-gray-500"
            } font-semibold hover:text-white`}
          >
            {displayText}
          </div>
        </Link>
      ) : (
        <div
          className={`${
            active ? "text-white" : "text-gray-500"
          } font-semibold hover:text-white`}
        >
          {displayText}
        </div>
      )}
    </div>
  );
};

export default TextWithHover;
