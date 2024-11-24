export type LayerLegendCategory = 'category' | 'gradient' | 'image';

export interface LayerStyle {
  colors: string[];
  labels: string[];
}

export interface Layer {
  id: number;
  name: string;
  title: string;
  visible?: boolean;
  category?: LayerLegendCategory;
  styles?: LayerStyle;
  extras?: {
    [k: string]: any;
  };
}

export interface Layers {
  [k: number]: Layer;
}
