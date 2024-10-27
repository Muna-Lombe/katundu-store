import { ArrowRight, titleTagTypes as tags } from "./icons";
import randomizer from "../utilities/randomizer";

const PinLocation = ({  }) => {
  const r= randomizer
  return(
  <span className="pin-location p-2 flex flex-row gap-4 items-center ">

    <span className="city-region pb-2 flex flex-row gap-6 border-b-2 text-lg  ">
      {r(tags.locations).city + ", " + r(tags.locations).state}
      <span className="arrow-right w-max flex items-end">
        <ArrowRight />
      </span>
    </span>
  </span>
)}

export default PinLocation;