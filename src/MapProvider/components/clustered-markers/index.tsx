import { useCallback } from "react";
import Supercluster, { ClusterProperties } from "supercluster";
import { FeaturesClusterMarker } from "./FeaturesClusterMarker";
import { FeatureMarker } from "./FeatureMarker";
import { useSupercluster } from "../../hooks/useSupercluster";
import { Feature, FeatureCollection, GeoJsonProperties, Point } from "geojson";

type ClusteredMarkersProps = {
  geojson: FeatureCollection<Point>;
  setInfowindowData: (
    data: {
      anchor: google.maps.marker.AdvancedMarkerElement;
      features: Feature<Point>[];
    } | null
  ) => void;
};

const superclusterOptions: Supercluster.Options<
  GeoJsonProperties,
  ClusterProperties
> = {
  extent: 256,
  radius: 80,
  maxZoom: 12,
};

export default function ClusteredMarkers({
  geojson,
  setInfowindowData,
}: ClusteredMarkersProps) {
  const { clusters, getLeaves } = useSupercluster(geojson, superclusterOptions);

  const handleClusterClick = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement, clusterId: number) => {
      const leaves = getLeaves(clusterId);

      setInfowindowData({ anchor: marker, features: leaves });
    },
    [getLeaves, setInfowindowData]
  );

  const handleMarkerClick = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement, featureId: string) => {
      const feature = clusters.find(
        (feat) => feat.id === featureId
      ) as Feature<Point>;

      setInfowindowData({ anchor: marker, features: [feature] });
    },
    [clusters, setInfowindowData]
  );

  return (
    <>
      {clusters.map((feature) => {
        const [lng, lat] = feature.geometry.coordinates;

        const clusterProperties = feature.properties as ClusterProperties;
        const isCluster: boolean = clusterProperties.cluster;

        return isCluster ? (
          <FeaturesClusterMarker
            key={feature.id}
            clusterId={clusterProperties.cluster_id}
            position={{ lat, lng }}
            size={clusterProperties.point_count}
            sizeAsText={String(clusterProperties.point_count_abbreviated)}
            onMarkerClick={handleClusterClick}
          />
        ) : (
          <FeatureMarker
            key={feature.id}
            featureId={feature.id as string}
            position={{ lat, lng }}
            onMarkerClick={handleMarkerClick}
          />
        );
      })}
    </>
  );
}
