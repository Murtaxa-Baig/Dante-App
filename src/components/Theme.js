import {createTheming} from '@callstack/react-theme-provider';

export const theme = {
  lightColor: {
    primary: '#006600',
    textBlack: '#141414',
    textGray: '#AEAEAE',
    inputBgColor: '#F6F6F6',
    borderColor: '#E6E6E6',
    textWhite: '#FFFFFF',
    bgWhite: '#FFFFFF',
    bgLightBlack: '#171717CC',
    textLightBlack: '#171717CC',
    textGreen: '#4CBA47',
    textLightBlack: '#373433',
    testYellow: '#F1EA24',
  },
  darkColor: {},
  fontWeight: {
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '900',
  },
  fontFamily: {
    LabGrotesqueRegular: 'LabGrotesque-Regular',
    LabGrotesqueMedium: 'LabGrotesque-Medium',
    LabGrotesqueBold: 'LabGrotesque-Bold',
  },
  animation: {
    scale: 1.0,
  },
};

const {ThemeProvider, withTheme, useTheme} = createTheming(theme);

export {ThemeProvider, withTheme, useTheme};
