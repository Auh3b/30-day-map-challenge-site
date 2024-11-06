export type LayerLegendCategory = "category" | "gradient" | "image";

export interface LayerStyle {
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

export interface Layers {
  [k: number]: Layer;
}
