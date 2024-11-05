import { Feature, Point } from "geojson";
import { InfoWindow as InfoWindowApi } from "@vis.gl/react-google-maps";
import { InfoWindowContent } from "./InfoWindowContent";

interface InfoWindowContentProps {
  features: Feature<Point>[];
  anchor: google.maps.marker.AdvancedMarkerElement;
  onCloseClick: () => void;
}

export default function InfoWindow({
  anchor,
  features,
  onCloseClick,
}: InfoWindowContentProps) {
  return (
    <InfoWindowApi onCloseClick={onCloseClick} anchor={anchor}>
      <InfoWindowContent features={features} />
    </InfoWindowApi>
  );
}
