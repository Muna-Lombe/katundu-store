import { ArrowRight, titleTagTypes as tags } from "../assets";

const PinLocation = ({  }) => (
  <span className="pin-location p-2 flex flex-row gap-4 items-center ">

    <span className="city-region pb-2 flex flex-row gap-6 border-b-2 text-lg  ">
      {tags.location.city + ", " + tags.location.state}
      <span className="arrow-right w-max flex items-end">
        <ArrowRight />
      </span>
    </span>
  </span>
)

export default PinLocation;