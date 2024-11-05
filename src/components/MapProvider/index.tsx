import { useCallback, useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Feature, FeatureCollection, Point } from "geojson";
import MapHandler from "./components/map-handler";
import MapControl from "./components/map-control";
import ClusteredMarkers from "./components/clustered-markers";
import InfoWindow from "./components/info-window";
import { getStores } from "../../services/api.service";

export type StoreFeatureProps = {
  name: string;
  address: string;
  city: string;
  state: string;
  wikipedia: string;
  wikidata: string;
};

type StoreGeojson = FeatureCollection<Point, StoreFeatureProps>;

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

export default function MapProvider() {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const [geojson, setGeojson] = useState<StoreGeojson | null>(null);
  const [infowindowData, setInfowindowData] = useState<{
    anchor: google.maps.marker.AdvancedMarkerElement;
    features: Feature<Point>[];
  } | null>(null);

  const handleInfoWindowClose = useCallback(
    () => setInfowindowData(null),
    [setInfowindowData]
  );

  useEffect(() => {
    async function fetchGeojson() {
      const response = await getStores();
      setGeojson(response);
    }

    fetchGeojson();
  }, []);

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        // mapId="b5387d230c6cf22f" // Map grey style
        mapId="e7f00e4f77c30c63" // Map simple style
        disableDefaultUI
        defaultZoom={3.3}
        gestureHandling="greedy"
        defaultCenter={{ lat: -24.012312, lng: -62.999822 }}
        className="w-screen h-screen"
      />
      {geojson && (
        <ClusteredMarkers
          geojson={geojson}
          setInfowindowData={setInfowindowData}
        />
      )}

      {infowindowData && (
        <InfoWindow
          anchor={infowindowData.anchor}
          features={infowindowData.features}
          onCloseClick={handleInfoWindowClose}
        />
      )}

      <MapControl setSelectedPlace={setSelectedPlace} />
      <MapHandler place={selectedPlace} />
    </APIProvider>
  );
}
