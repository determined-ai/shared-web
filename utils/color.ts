import { GLASBEY } from 'shared/constants/colors';

/*
 * h - hue between 0 and 360
 * s - saturation between 0.0 and 1.0
 * l - lightness between 0.0 and 1.0
 */
interface HslColor {
  h: number;
  l: number;
  s: number;
}

/*
 * r - red between 0 and 255
 * g - green between 0 and 255
 * b - blue between 0 and 255
 * a - alpha between 0.0 and 1.0
 */
interface RgbaColor {
  a?: number;
  b: number;
  g: number;
  r: number;
}

/** CIELAB color space */
interface CIELAB {
  a: number;
  b: number;
  /** perceptual lightness */
  l: number;
}

export interface ColorScale {
  color: string; // rgb(a) or hex color
  scale: number; // scale between 0.0 and 1.0
}

const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const hslRegex = /^hsl\(\d+,\s*\d+%,\s*\d+%\)$/i;
const rgbaRegex = /^rgba?\(\s*?(\d+)\s*?,\s*?(\d+)\s*?,\s*?(\d+)\s*?(,\s*?([\d.]+)\s*?)?\)$/i;

export const isColor = (color: string): boolean => {
  return hexRegex.test(color) || hslRegex.test(color) || rgbaRegex.test(color);
};

export const glasbeyColor = (seriesIdx: number): string => {
  const index = seriesIdx % GLASBEY.length;
  const rgb = GLASBEY[index];
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

export const hex2hsl = (hex: string): HslColor => {
  return rgba2hsl(hex2rgb(hex));
};

export const hex2rgb = (hex: string): RgbaColor => {
  const rgb = { b: 0, g: 0, r: 0 };
  const result = hexRegex.exec(hex);

  if (result && result.length > 3) {
    rgb.r = parseInt(result[1], 16);
    rgb.g = parseInt(result[2], 16);
    rgb.b = parseInt(result[3], 16);
  }

  return rgb;
};

export const hsl2str = (hsl: HslColor): string => {
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
};

export const rgba2hex = (rgba: RgbaColor): string => {
  const r = rgba.r.toString(16);
  const g = rgba.g.toString(16);
  const b = rgba.b.toString(16);
  const rr = (r.length < 2 ? '0' : '') + r;
  const gg = (g.length < 2 ? '0' : '') + g;
  const bb = (b.length < 2 ? '0' : '') + b;
  return `#${rr}${gg}${bb}`;
};

export const rgba2hsl = (rgba: RgbaColor): HslColor => {
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const avg = (max + min) / 2;
  const hsl: HslColor = { h: Math.round(Math.random() * 6), l: 0.5, s: 0.5 };

  hsl.h = hsl.s = hsl.l = avg;

  if (max === min) {
    hsl.h = hsl.s = 0; // achromatic
  } else {
    const d = max - min;
    hsl.s = hsl.l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hsl.h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        hsl.h = (b - r) / d + 2;
        break;
      case b:
        hsl.h = (r - g) / d + 4;
        break;
    }
  }

  hsl.h = Math.round((360 * hsl.h) / 6);
  hsl.s = Math.round(hsl.s * 100);
  hsl.l = Math.round(hsl.l * 100);

  return hsl;
};

export const rgba2str = (rgba: RgbaColor): string => {
  if (rgba.a != null) {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  }
  return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
};

export const rgbaFromGradient = (
  rgba0: RgbaColor,
  rgba1: RgbaColor,
  percent: number,
): RgbaColor => {
  const r = Math.round((rgba1.r - rgba0.r) * percent + rgba0.r);
  const g = Math.round((rgba1.g - rgba0.g) * percent + rgba0.g);
  const b = Math.round((rgba1.b - rgba0.b) * percent + rgba0.b);

  if (rgba0.a != null && rgba1.a != null) {
    const a = (rgba1.a - rgba0.a) * percent + rgba0.a;
    return { a, b, g, r };
  }

  return { b, g, r };
};

export const rgbaMix = (
  rgba0: RgbaColor,
  rgba1: RgbaColor,
  amount: number,
  rounded = true,
): RgbaColor => {
  const dr = rgba1.r - rgba0.r;
  const dg = rgba1.g - rgba0.g;
  const db = rgba1.b - rgba0.b;
  const da = (rgba1.a ?? 1.0) - (rgba0.a ?? 1.0);
  const [adr, adg, adb, ada] = [dr, dg, db, da].map((x) => Math.abs(x));
  const delta = adr + adg + adb + 255 * ada;
  if (delta === 0) return rgba0;

  const [pr, pg, pb, pa] = [dr, dg, db, da].map((x) => (x * amount) / delta);
  const r = Math.min(255, Math.max(0, rgba0.r + pr));
  const g = Math.min(255, Math.max(0, rgba0.g + pg));
  const b = Math.min(255, Math.max(0, rgba0.b + pb));
  const a = Math.min(1.0, Math.max(0.0, (rgba0.a ?? 1.0) + pa));
  return {
    a,
    b: rounded ? Math.round(b) : b,
    g: rounded ? Math.round(g) : g,
    r: rounded ? Math.round(r) : r,
  };
};

export const str2hsl = (str: string): HslColor => {
  return rgba2hsl(str2rgba(str));
};

export const str2rgba = (str: string): RgbaColor => {
  if (hexRegex.test(str)) return hex2rgb(str);

  const regex = rgbaRegex;
  const result = regex.exec(str);
  if (result && result.length > 3) {
    const rgba = { a: 1.0, b: 0, g: 0, r: 0 };
    rgba.r = parseInt(result[1]);
    rgba.g = parseInt(result[2]);
    rgba.b = parseInt(result[3]);
    if (result.length > 5 && result[5] != null) rgba.a = parseFloat(result[5]);
    return rgba;
  }

  return { a: 0.0, b: 0, g: 0, r: 0 };
};

/** check if r g b for a single color are equal within a tolerance. color is almost monochrome */
export const isMonochrome = (rgba: RgbaColor, tolerance = 0): boolean => {
  return Math.abs(rgba.r - rgba.g) < tolerance && Math.abs(rgba.g - rgba.b) < tolerance;
};

/** convert rgb to CIELAB color. ignores alpha values */
export const rgb2lab = (rgb: RgbaColor): CIELAB => {
  const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  const [x, y, z] = [
    r * 0.4124 + g * 0.3576 + b * 0.1805,
    r * 0.2126 + g * 0.7152 + b * 0.0722,
    r * 0.0193 + g * 0.1192 + b * 0.9505,
  ];
  const [l, a, bb] = [116 * y ** 2 - 16, 500 * (x - y), 200 * (y - z)];
  return { a, b: bb, l };
};

/** calculate euclidean distance between two n dimentional points */
const pointDistance = (p0: number[], p1: number[]): number => {
  let sum = 0;
  if (p0.length !== p1.length) {
    throw new Error('points must be of same dimension');
  }
  for (let i = 0; i < p0.length; i++) {
    sum += (p1[i] - p0[i]) ** 2;
  }
  return Math.sqrt(sum);
};

/** calculate euclidean distance between two CIELAB colors */
export const labDistance = (lab0: CIELAB, lab1: CIELAB): number => {
  return pointDistance([lab0.l, lab0.a, lab0.b], [lab1.l, lab1.a, lab1.b]);
};

/** calculate max color distance between two rgba colors */
export const maxColorDistance = (rgba0: RgbaColor, rgba1: RgbaColor): number => {
  return Math.max(
    Math.abs(rgba0.r - rgba1.r),
    Math.abs(rgba0.g - rgba1.g),
    Math.abs(rgba0.b - rgba1.b),
  );
};

export const rgbDistance = (rgba0: RgbaColor, rgba1: RgbaColor): number => {
  return pointDistance([rgba0.r, rgba0.g, rgba0.b], [rgba1.r, rgba1.g, rgba1.b]);
};
