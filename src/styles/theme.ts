import baseStyled, { css, CSSProp, ThemedStyledInterface } from 'styled-components';

import sizes from '../config/breakpoint';
import colors from './colors';

type BackQuoteArgs = string[];

interface Media {
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
  tablet: (...args: BackQuoteArgs) => CSSProp | undefined;

  desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
  etc: (...args: BackQuoteArgs) => CSSProp | undefined;
}

// const media: Media = {
//   mobile: (...args: BackQuoteArgs) => undefined,
//   tablet: (...args: BackQuoteArgs) => undefined,
//   desktop: (...args: BackQuoteArgs) => undefined,
//   etc: (...args: BackQuoteArgs) => undefined,
// };

const media: Media = {
  mobile: () => undefined,
  tablet: () => undefined,
  desktop: () => undefined,
  etc: () => undefined,
};

// interface Media {
//   mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
//   pc: (...args: BackQuoteArgs) => CSSProp | undefined;
// }

// const media: Media = {
//   mobile: (...args: BackQuoteArgs) => undefined,
//   pc: (...args: BackQuoteArgs) => undefined,
// };

Object.keys(sizes).reduce((acc: Media, label: string) => {
  switch (label) {
    case 'desktop':
      acc.desktop = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (min-width: ${sizes.desktop}px) {
            ${args}
          }
        `;
      break;
    case 'tablet':
      acc.tablet = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.tablet}px) {
            ${args}
          }
        `;
      break;
    case 'mobile':
      acc.mobile = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.mobile}px) {
            ${args}
          }
        `;
      break;
    case 'etc':
      acc.etc = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.etc}px) {
            ${args}
          }
        `;
      break;
    // case 'desktop':
    //   acc.desktop = (...args: BackQuoteArgs) =>
    //     css`
    //       @media only screen and (min-width: ${sizes.desktop}px) {
    //         ${args}
    //       }
    //     `;
    //   break;
    // case 'tablet':
    //   acc.tablet = (...args: BackQuoteArgs) =>
    //     css`
    //       @media only screen and (max-width: ${sizes.desktop}px) and (min-width: ${sizes.tablet}px) {
    //         ${args}
    //       }
    //     `;
    //   break;
    // case 'mobile':
    //   acc.mobile = (...args: BackQuoteArgs) =>
    //     css`
    //       @media only screen and (max-width: ${sizes.tablet}px) {
    //         ${args}
    //       }
    //     `;
    //   break;
    default:
      break;
  }
  return acc;
}, media);

const secondaryColors = {};
const fontSizes: string[] = [];

const theme = {
  colors,
  fontSizes,
  secondaryColors,
  media,
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;
