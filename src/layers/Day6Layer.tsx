import { useEffect, useMemo } from "react";
import { BitmapLayer } from "deck.gl";
import useMapVisibility from "@hooks/useMapVisibility";
import useMapLayer from "@hooks/useMapLayer";
import useMapStore from "@storesuseMapStore";
import usePageStore from "@storesusePageStore";

const day = 6;

export default function Day6Layer() {
  const { challengeData } = usePageStore((state) => state);

  const {
    viewState: { latitude, longitude, zoom },
    setViewState,
  } = useMapStore((state) => state);

  const { handleLayer } = useMapLayer();

  const isChallengeDataReady = Boolean(challengeData);

  const isVisible = useMapVisibility(day);

  useEffect(() => {
    if (isChallengeDataReady) {
      handleLayer({
        [day]: {
          name: challengeData[day].id,
          title: challengeData[day].title,
          category: "gradient",
          visible: isVisible,
          styles: {
            colors: [],
            labels: ["Malawi"],
          },
        },
      });
    }
  }, [isVisible, isChallengeDataReady]);

  const mapDetails = useMemo(() => {
    if (challengeData) return challengeData[day];
  }, [challengeData]);

  if (isChallengeDataReady && mapDetails)
    return new BitmapLayer({
      id: mapDetails.id,
      image: mapDetails.url,
      bounds: [0, 0, 0, 0],
      onDataLoad: () => {
        setViewState({ latitude, longitude, zoom });
      },
    });
}