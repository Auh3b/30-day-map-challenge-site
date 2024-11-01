export type LayerLegendCategory = 'category' | '';

interface LayerStyle {
  colors: string[];
  labels: string[];
}

export interface Layer {
  name: string;
  title: string;
  visible: boolean;
  category: LayerLegendCategory;
  styles: LayerStyle;
}

export type Layers = Layer[];
