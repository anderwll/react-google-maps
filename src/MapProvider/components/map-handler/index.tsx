import { useMap } from "@vis.gl/react-google-maps";
import { memo, useEffect } from "react";

interface Props {
  place: google.maps.places.PlaceResult | null;
}

function MapHandler({ place }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!map || !place) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
  }, [map, place]);

  return null;
}

export default memo(MapHandler);
