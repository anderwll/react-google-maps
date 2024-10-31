import { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Feature, FeatureCollection, Point } from "geojson";

import castles from "../castels.json";
import MapHandler from "./components/map-handler";
import MapControl from "./components/map-control";
import ClusteredMarkers from "./components/clustered-markers";

type CastleFeatureProps = {
  name: string;
  wikipedia: string;
  wikidata: string;
};

type CastlesGeojson = FeatureCollection<Point, CastleFeatureProps>;

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

export default function MapProvider() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const [geojson, setGeojson] = useState<CastlesGeojson | null>(null);
  const [numClusters, setNumClusters] = useState(0);

  const [infowindowData, setInfowindowData] = useState<{
    anchor: google.maps.marker.AdvancedMarkerElement;
    features: Feature<Point>[];
  } | null>(null);

  // const handleInfoWindowClose = useCallback(
  //   () => setInfowindowData(null),
  //   [setInfowindowData]
  // );

  useEffect(() => {
    setGeojson(JSON.parse(JSON.stringify(castles)));
  }, []);

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId="b5387d230c6cf22f"
        disableDefaultUI
        defaultZoom={3}
        gestureHandling="greedy"
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        className="w-screen h-screen"
      />
      {geojson && (
        <ClusteredMarkers
          geojson={geojson}
          setNumClusters={setNumClusters}
          setInfowindowData={setInfowindowData}
        />
      )}

      <MapControl setSelectedPlace={setSelectedPlace} />
      <MapHandler place={selectedPlace} />
    </APIProvider>
  );
}
