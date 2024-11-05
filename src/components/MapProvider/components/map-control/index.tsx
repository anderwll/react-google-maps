import {
  ControlPosition,
  MapControl as MapControlApi,
} from "@vis.gl/react-google-maps";
import { useMediaQuery } from "usehooks-ts";
import Autocomplete from "./Autocomplete";
import { useMemo } from "react";

interface MapControlProps {
  setSelectedPlace: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult | null>
  >;
}

export default function MapControl({ setSelectedPlace }: MapControlProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const position = useMemo(
    () => (isMobile ? ControlPosition.LEFT_TOP : ControlPosition.TOP_CENTER),
    [isMobile]
  );

  return (
    <MapControlApi position={position}>
      <div className="autocomplete-control">
        <Autocomplete onPlaceSelect={setSelectedPlace} />
      </div>
    </MapControlApi>
  );
}
