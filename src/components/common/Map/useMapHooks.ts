import useMapStore from '@storesuseMapStore';
import { MapViewState, PickingInfo } from 'deck.gl';

// interface DataType {
//   name: string;
//   [k: string]: string | number;
// }

interface Tooltip {
  object?: {
    html?: string;
  };
}

export default function useMapHooks() {
  const { setMapDiv, setViewState } = useMapStore();
  let isHovering = false;
  const handleHover = ({ object }: { object: Tooltip['object'] }) =>
    (isHovering = !!object);

  const handleCursor = ({ isDragging }: { isDragging: boolean }) =>
    isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';

  const handleToolTip = (info: PickingInfo) => {
    if (info?.object?.html)
      return {
        html: `<div>${info.object.html}</div>`,
      };
  };

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
    handleHover,
    handleCursor,
    handleToolTip,
    handleViewStateChange,
    handleResize,
  };
}
