/* eslint-disable sort-keys-fix/sort-keys-fix */
import { isColor, rgba2str, rgbaMix, str2rgba } from './utils/color';

const STRONG_WEAK_DELTA = 45;
export const getCssVar = (name: string): string => {
  return window.getComputedStyle(document.body)?.getPropertyValue(name);
};
const generateStrongWeak = (theme: Theme): Theme => {
  const rgbaStrong = str2rgba(theme.strong);
  const rgbaWeak = str2rgba(theme.weak);

  for (const [ key, value ] of Object.entries(theme)) {
    const matches = key.match(/^(.+)(Strong|Weak)$/);
    if (matches?.length === 3 && value === undefined) {
      const isStrong = matches[2] === 'Strong';
      const baseKey = matches[1] as keyof Theme;
      const baseValue = theme[baseKey];
      if (baseValue && isColor(baseValue)) {
        const rgba = str2rgba(baseValue);
        const mixer = isStrong ? rgbaStrong : rgbaWeak;
        theme[key as keyof Theme] = rgba2str(rgbaMix(rgba, mixer, STRONG_WEAK_DELTA));
      }
    }
  }

  return theme as Theme;
};
const themeBase = {

  // Area and surface styles.
  background: undefined,

  backgroundBorder: undefined,

  backgroundBorderStrong: undefined,

  backgroundBorderWeak: undefined,

  backgroundOn: undefined,

  backgroundOnStrong: undefined,

  backgroundOnWeak: undefined,

  backgroundStrong: undefined,

  backgroundWeak: undefined,

  borderRadius: '4px',

  borderRadiusStrong: '8px',

  borderRadiusWeak: '2px',

  // Brand colors.
  brand: 'rgba(247, 123, 33, 1.0)',

  brandStrong: undefined,

  brandWeak: undefined,

  // Specialized and unique styles.
  density: '2',

  elevation: undefined,

  elevationStrong: undefined,

  elevationWeak: undefined,

  float: undefined,

  floatBorder: undefined,

  floatBorderStrong: undefined,

  floatBorderWeak: undefined,

  floatOn: undefined,

  floatOnStrong: undefined,

  floatOnWeak: undefined,

  floatStrong: undefined,

  floatWeak: undefined,

  // Font styles.
  fontFamily: '"Objektiv Mk3", Arial, Helvetica, sans-serif',

  fontFamilyCode: '"Source Code Pro", monospace',

  // Interactive styles.
  ix: undefined,

  ixActive: undefined,

  ixBorder: undefined,

  ixBorderActive: undefined,

  ixBorderInactive: undefined,

  ixBorderStrong: undefined,

  ixBorderWeak: undefined,

  ixInactive: undefined,

  ixOn: undefined,

  ixOnActive: undefined,

  ixOnInactive: undefined,

  ixOnStrong: undefined,

  ixOnWeak: undefined,

  ixStrong: undefined,

  ixWeak: undefined,

  overlay: undefined,

  overlayStrong: undefined,

  overlayWeak: undefined,

  stage: undefined,

  stageBorder: undefined,

  stageBorderStrong: undefined,

  stageBorderWeak: undefined,

  stageOn: undefined,

  stageOnStrong: undefined,

  stageOnWeak: undefined,

  stageStrong: undefined,

  stageWeak: undefined,

  // Status styles.
  statusActive: 'rgba(0, 155, 222, 1.0)',

  statusActiveOn: 'rgba(255, 255, 255, 1.0)',

  statusActiveOnStrong: undefined,

  statusActiveOnWeak: undefined,

  statusActiveStrong: undefined,

  statusActiveWeak: undefined,

  statusCritical: 'rgba(204, 0, 0, 1.0)',

  statusCriticalOn: 'rgba(255, 255, 255, 1.0)',

  statusCriticalOnStrong: undefined,

  statusCriticalOnWeak: undefined,

  // Palette colors for strong/weak calculations.
  strong: undefined,

  statusCriticalStrong: undefined,

  statusCriticalWeak: undefined,

  weak: undefined,

  statusInactive: 'rgba(102, 102, 102, 1.0)',

  statusInactiveOn: 'rgba(255, 255, 255, 1.0)',
  statusInactiveOnStrong: undefined,
  statusInactiveOnWeak: undefined,
  statusInactiveStrong: undefined,
  statusInactiveWeak: undefined,
  statusPending: 'rgba(102, 102, 204, 1.0)',
  statusPendingOn: 'rgba(255, 255, 255, 1.0)',
  statusPendingOnStrong: undefined,
  statusPendingOnWeak: undefined,
  surface: undefined,
  statusPendingStrong: undefined,
  surfaceBorder: undefined,
  statusPendingWeak: undefined,
  surfaceBorderStrong: undefined,
  statusPotential: 'rgba(255, 255, 255, 0)',
  surfaceOn: undefined,
  statusSuccess: 'rgba(0, 153, 0, 1.0)',
  statusSuccessOn: 'rgba(255, 255, 255, 1.0)',
  surfaceOnStrong: undefined,
  statusSuccessOnStrong: undefined,
  statusSuccessOnWeak: undefined,
  surfaceStrong: undefined,
  statusSuccessStrong: undefined,
  statusSuccessWeak: undefined,
  surfaceWeak: undefined,
  statusWarning: 'rgba(204, 153, 0, 1.0)',
  surfaceOnWeak: undefined,
  statusWarningOn: 'rgba(255, 255, 255, 1.0)',
  statusWarningOnStrong: undefined,
  surfaceBorderWeak: undefined,
  statusWarningOnWeak: undefined,
  statusWarningStrong: undefined,
  statusWarningWeak: undefined,
  strokeWidth: '1px',
  strokeWidthStrong: '3px',
  strokeWidthWeak: '0.5px',
  targetFocus: '0px 0px 4px rgba(0, 155, 222, 0.12)',
};
const themeLight = {

  // Area and surface styles.
  background: 'rgba(240, 240, 240, 1.0)',

  backgroundBorder: undefined,

  backgroundOn: 'rgba(18, 18, 18, 1.0)',

  elevation: '0px 6px 12px rgba(0, 0, 0, 0.12)',

  elevationStrong: '0px 12px 24px rgba(0, 0, 0, 0.12)',

  elevationWeak: '0px 2px 4px rgba(0, 0, 0, 0.24)',

  float: 'rgba(255, 255, 255, 1.0)',

  floatBorder: 'rgba(225, 225, 225, 1.0)',

  floatOn: 'rgba(49, 49, 49, 1.0)',

  // Interactive styles.
  ix: 'rgba(255, 255, 255, 1.0)',

  ixActive: 'rgba(231, 247, 255, 1.0)',

  ixBorder: 'rgba(217, 217, 217, 1.0)',

  ixBorderActive: 'rgba(0, 155, 222, 1.0)',

  ixBorderInactive: 'rgba(217, 217, 217, 1.0)',

  ixInactive: 'rgba(245, 245, 245, 1.0)',

  ixOn: 'rgba(38, 38, 38, 1.0)',

  ixOnActive: 'rgba(0, 155, 222, 1.0)',

  ixOnInactive: 'rgba(217, 217, 217, 1.0)',

  // Specialized and unique styles.
  overlay: 'rgba(255, 255, 255, 0.75)',

  overlayStrong: 'rgba(255, 255, 255, 1.0)',

  overlayWeak: 'rgba(255, 255, 255, 0.5)',

  stage: 'rgba(246, 246, 246, 1.0)',

  stageBorder: 'rgba(194, 194, 194, 1.0)',

  stageOn: 'rgba(69, 69, 69, 1.0)',

  // Palette colors for strong/weak calculations.
  strong: 'rgba(0, 0, 0, 1.0)',

  surface: 'rgba(250, 250, 250, 1.0)',

  surfaceBorder: 'rgba(212, 212, 212, 1.0)',
  surfaceOn: 'rgba(0, 8, 16, 1.0)',
  weak: 'rgba(255, 255, 255, 1.0)',
};
const themeDark = {

  // Area and surface styles.
  background: 'rgba(21, 21, 23, 1.0)',

  backgroundBorder: undefined,

  backgroundOn: 'rgba(237, 237, 237, 1.0)',

  elevation: '0px 6px 12px rgba(0, 0, 0, 0.12)',

  elevationStrong: '0px 12px 24px rgba(0, 0, 0, 0.12)',

  elevationWeak: '0px 2px 4px rgba(0, 0, 0, 0.24)',

  float: 'rgba(60, 61, 62, 1.0)',

  floatBorder: 'rgba(90, 91, 92, 1.0)',

  floatOn: 'rgba(206, 206, 206, 1.0)',

  // Interactive styles.
  ix: 'rgba(21, 21, 23, 1.0)',

  ixActive: 'rgba(17, 27, 38, 1.0)',

  ixBorder: 'rgba(67, 67, 67, 1.0)',

  ixBorderActive: 'rgba(23, 125, 220, 1.0)',

  ixBorderInactive: 'rgba(45, 45, 45, 1.0)',

  ixInactive: 'rgba(49, 49, 49, 1.0)',

  ixOn: 'rgba(209, 209, 209, 1.0)',

  ixOnActive: 'rgba(23, 125, 220, 1.0)',

  ixOnInactive: 'rgba(45, 45, 45, 1.0)',

  // Specialized and unique styles.
  overlay: 'rgba(0, 0, 0, 0.75)',

  overlayStrong: 'rgba(0, 0, 0, 1.0)',

  overlayWeak: 'rgba(0, 0, 0, 0.5)',

  stage: 'rgba(35, 36, 38, 1.0)',

  stageBorder: 'rgba(61, 61, 61, 1.0)',

  stageOn: 'rgba(186, 186, 186, 1.0)',

  // Palette colors for strong/weak calculations.
  strong: 'rgba(255, 255, 255, 1.0)',

  surface: 'rgba(48, 49, 50, 1.0)',

  surfaceBorder: 'rgba(85, 85, 85, 1.0)',
  surfaceOn: 'rgba(255, 247, 239, 1.0)',
  weak: 'rgba(0, 0, 0, 1.0)',
};
export const themeLightDetermined: Theme =
  generateStrongWeak(Object.assign({}, themeBase, themeLight));
export const themeDarkDetermined: Theme =
  generateStrongWeak(Object.assign({}, themeBase, themeDark));
const themeHpe = { brand: 'rgba(1, 169, 130, 1.0)' };
export const themeLightHpe: Theme =
  generateStrongWeak(Object.assign({}, themeBase, themeLight, themeHpe));
export const themeDarkHpe: Theme =
  generateStrongWeak(Object.assign({}, themeBase, themeDark, themeHpe));
export type Theme = Record<keyof typeof themeBase, string>;
export const globalCssVars = {
  animationCurve: '0.2s cubic-bezier(0.785, 0.135, 0.15, 0.86)',

  fontFamily: '"Objektiv Mk3", Arial, Helvetica, sans-serif',
  fontFamilyCode: '"Source Code Pro", monospace',

  iconBig: '28px',
  iconEnormous: '40px',
  iconGiant: '44px',
  iconGreat: '32px',
  iconHuge: '36px',
  iconJumbo: '48px',
  iconLarge: '24px',
  iconMedium: '20px',
  iconMega: '52px',
  iconSmall: '16px',
  iconTiny: '12px',

  navBottomBarHeight: '56px',
  navSideBarWidthMax: '240px',
  navSideBarWidthMin: '56px',
};

export enum DarkLight {
  Dark = 'dark',
  Light = 'light',
}
