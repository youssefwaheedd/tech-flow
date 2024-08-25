import React from "react";
import Metric from "./Metric";

const Votes = () => {
  return (
    <div className="flex gap-4">
      <Metric
        imgUrl="/assets/icons/upvote.svg"
        alt="upvote"
        value="0" // implement logic to get the number of upvotes
        title=""
        textStyles="background-light800_dark300 text-dark300_light900 px-3 py-2 rounded-md text-sm text-center"
      />
      <Metric
        imgUrl="/assets/icons/downvote.svg"
        alt="upvote"
        value="0" // implement logic to get the number of downvotes
        title=""
        textStyles="background-light800_dark300 text-dark300_light900 px-3 py-2  rounded-md text-sm text-center"
      />
      <Metric imgUrl="/assets/icons/star.svg" alt="saved" />
    </div>
  );
};

export default Votes;
