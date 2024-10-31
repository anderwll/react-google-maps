import {
  ControlPosition,
  MapControl as MapControlApi,
} from "@vis.gl/react-google-maps";
import Autocomplete from "./Autocomplete";

interface MapControlProps {
  setSelectedPlace: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult | null>
  >;
}

export default function MapControl({ setSelectedPlace }: MapControlProps) {
  return (
    <MapControlApi position={ControlPosition.TOP_CENTER}>
      <div className="autocomplete-control">
        <Autocomplete onPlaceSelect={setSelectedPlace} />
      </div>
    </MapControlApi>
  );
}
