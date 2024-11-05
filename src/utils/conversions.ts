import { color, rgb, scaleLinear } from 'd3';

export function d32DeckglColor(value: string): number[] {
  const colorObject = color(value);
  const [red, green, blue, alpha] = Object.values(colorObject.rgb());
  return [red, green, blue, alphaOn255Scale(alpha)];
}

function alphaOn255Scale(value: number): number {
  const scale = scaleLinear([0, 1], [0, 255]);
  return scale(value);
}

export function DeckglColor2D3(value: number[]): string {
  const [red = 0, green = 0, blue = 0, alpha = 0] = value;
  const trueAlpha = alphaOn255Scale(alpha);
  const newColor = rgb(red, green, blue, trueAlpha);
  return newColor.formatHex();
}
