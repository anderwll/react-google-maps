import { memo } from "react";
import { Feature, Point } from "geojson";
import { StoreFeatureProps } from "../..";

type InfowindowContentProps = {
  features: Feature<Point>[];
};

const numFmt = new Intl.NumberFormat();

export const InfoWindowContent = memo(
  ({ features }: InfowindowContentProps) => {
    if (features.length === 1) {
      const f = features[0];
      const props = f.properties! as StoreFeatureProps;

      return (
        <div className="mb-1 px-2 flex flex-col gap-2 text-start">
          <h4>
            <span className="font-bold mr-1">Nome:</span>
            {props.name}
          </h4>
          <p>
            <span className="font-bold mr-1">Endereço:</span>
            {props.address}
          </p>
          <p>
            <span className="font-bold mr-1">Cidade/UF:</span>
            {props.city}/{props.state}
          </p>

          <a
            href={getDetailsUrl(props)}
            target="_blank"
            className="text-blue-400 font-bold text-center hover:underline"
          >
            Ver mais detalhes...
          </a>
        </div>
      );
    }

    return (
      <div className="mx-4 mb-2 px-2 flex flex-col gap-2">
        <h4 className="text-lg font-bold">
          {numFmt.format(features.length)} lojas. Amplie para explorar.
        </h4>

        <ul className="text-start list-decimal flex flex-col gap-1">
          {features.map((feature) => {
            const props = feature.properties! as StoreFeatureProps;
            return (
              <li key={feature.id} className="font-bold hover:text-blue-400">
                <a
                  href={getDetailsUrl(props)}
                  target="_blank"
                  className="font-normal ml-1"
                >
                  {props.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

function getDetailsUrl(props: StoreFeatureProps) {
  return props.wikipedia
    ? getWikipediaUrl(props.wikipedia)
    : getWikidataUrl(props.wikidata);
}

function getWikipediaUrl(contentId: string) {
  const [lang, title] = contentId.split(":");

  return `https://${lang}.wikipedia.org/wiki/${title.replace(/ /g, "_")}`;
}
function getWikidataUrl(id: string) {
  return `https://www.wikidata.org/wiki/${id}`;
}
