import useMapStore from '@storesuseMapStore';
import { MapViewState } from 'deck.gl';

export default function useMapHooks() {
  const { setMapDiv, setViewState } = useMapStore();
  const handleViewStateChange = ({
    viewState,
  }: {
    viewState: MapViewState;
  }) => {
    delete viewState.transitionInterpolator;
    delete viewState.transitionDuration;

    setViewState(viewState);
  };
  const handleResize = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    setMapDiv(width, height);
  };

  return {
    handleViewStateChange,
    handleResize,
  };
}
