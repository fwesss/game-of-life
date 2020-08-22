import defaultTheme, { Theme } from '@chakra-ui/theme'

type Nord = {
  green: string
  yellow: string
  gray50: string
  gray400: string
  gray600: string
  teal: string
  gray500: string
  gray300: string
  cyan: string
  red: string
  orange: string
  blue: string
  gray100: string
  gray200: string
  purple: string
  indigo: string
}

const nord: Nord = {
  gray600: 'hsl(220,16%,22%)',
  gray500: 'hsl(222,16%,28%)',
  gray400: 'hsl(220,17%,32%)',
  gray300: 'hsl(220,16%,36%)',
  gray200: 'hsl(219,28%,88%)',
  gray100: 'hsl(218,27%,92%)',
  gray50: 'hsl(218,27%,94%)',
  teal: 'hsl(179,25%,65%)',
  cyan: 'hsl(193,43%,67%)',
  indigo: 'hsl(210,34%,63%)',
  blue: 'hsl(213,32%,52%)',
  red: 'hsl(354,42%,56%)',
  orange: 'hsl(14,51%,63%)',
  yellow: 'hsl(40,71%,73%)',
  green: 'hsl(92,28%,65%)',
  purple: 'hsl(311,20%,63%)'
}

type CustomTheme = Omit<Theme, 'space' | 'fontSizes'> & {
  colors: {
    nord: Nord
    lightModeText: string
    darkModeText: string
    lightModeBg: string
    darkModeBg: string
    lightModeFocused: string
    darkModeFocused: string
    lightModeBorder: string
    darkModeBorder: string
    lightModeSubtle: string
    darkModeSubtle: string
    primaryCalm: string
    primaryBright: string
    secondary: string
    tertiary: string
    error: string
    danger: string
    warning: string
    success: string
    spunky: string
  }
  fonts: {
    title: string
  }
  space: {
    [key: string]: string
  }
  fontSizes: {
    [key: string]: string
  }
}

const customTheme: CustomTheme = {
  ...defaultTheme,
  config: {
    initialColorMode: 'light'
  },
  colors: {
    ...defaultTheme.colors,
    nord,
    lightModeText: nord.gray600,
    darkModeText: nord.gray50,
    lightModeBg: nord.gray50,
    darkModeBg: nord.gray600,
    lightModeFocused: nord.gray200,
    darkModeFocused: nord.gray100,
    lightModeBorder: nord.gray200,
    darkModeBorder: nord.gray500,
    lightModeSubtle: nord.gray300,
    darkModeSubtle: nord.gray100,
    primaryCalm: nord.teal,
    primaryBright: nord.cyan,
    secondary: nord.indigo,
    tertiary: nord.blue,
    error: nord.red,
    danger: nord.orange,
    warning: nord.yellow,
    success: nord.green,
    spunky: nord.purple,
    black: 'hsl(220, 16%, 15%)',
    white: 'hsl(218, 27%, 94%)',
    gray: {
      50: 'hsl(227,33%,95%)',
      100: 'hsl(219,23%,86%)',
      200: 'hsl(218,18%,76%)',
      300: 'hsl(219,17%,66%)',
      400: 'hsl(219,15%,59%)',
      500: 'hsl(219,15%,52%)',
      600: 'hsl(219,15%,45%)',
      700: 'hsl(219,15%,37%)',
      800: 'hsl(219,15%,30%)',
      900: 'hsl(220,16%,22%)'
    },
    red: {
      50: 'hsl(354,50%,94%)',
      100: 'hsl(354,53%,85%)',
      200: 'hsl(354,45%,69%)',
      300: 'hsl(354,42%,56%)',
      400: 'hsl(354,53%,51%)',
      500: 'hsl(354,71%,46%)',
      600: 'hsl(354,76%,41%)',
      700: 'hsl(354,85%,36%)',
      800: 'hsl(354,96%,31%)',
      900: 'hsl(354,100%,28%)'
    },
    orange: {
      50: 'hsl(14,23%,92%)',
      100: 'hsl(14,49%,83%)',
      200: 'hsl(14,50%,73%)',
      300: 'hsl(14,51%,63%)',
      400: 'hsl(14,53%,56%)',
      500: 'hsl(14,58%,50%)',
      600: 'hsl(14,59%,47%)',
      700: 'hsl(14,59%,44%)',
      800: 'hsl(14,60%,40%)',
      900: 'hsl(14,62%,34%)'
    },
    yellow: {
      50: 'hsl(40,70%,94%)',
      100: 'hsl(40,69%,84%)',
      200: 'hsl(40,71%,73%)',
      300: 'hsl(40,73%,63%)',
      400: 'hsl(40,76%,55%)',
      500: 'hsl(40,81%,49%)',
      600: 'hsl(40,84%,47%)',
      700: 'hsl(40,89%,45%)',
      800: 'hsl(40,96%,42%)',
      900: 'hsl(40,100%,39%)'
    },
    green: {
      50: 'hsl(92,29%,91%)',
      100: 'hsl(92,28%,78%)',
      200: 'hsl(92,28%,65%)',
      300: 'hsl(92,29%,51%)',
      400: 'hsl(92,42%,42%)',
      500: 'hsl(92,69%,31%)',
      600: 'hsl(92,74%,27%)',
      700: 'hsl(92,86%,22%)',
      800: 'hsl(92,100%,17%)',
      900: 'hsl(92,100%,12%)'
    },
    teal: {
      50: 'hsl(179,27%,91%)',
      100: 'hsl(179,26%,78%)',
      200: 'hsl(179,25%,65%)',
      300: 'hsl(179,25%,52%)',
      400: 'hsl(179,34%,42%)',
      500: 'hsl(179,43%,35%)',
      600: 'hsl(179,41%,32%)',
      700: 'hsl(179,40%,28%)',
      800: 'hsl(179,38%,24%)',
      900: 'hsl(179,35%,17%)'
    },
    cyan: {
      50: 'hsl(193,46%,92%)',
      100: 'hsl(193,46%,80%)',
      200: 'hsl(193,43%,67%)',
      300: 'hsl(193,44%,56%)',
      400: 'hsl(193,54%,48%)',
      500: 'hsl(193,100%,35%)',
      600: 'hsl(193,100%,33%)',
      700: 'hsl(193,100%,30%)',
      800: 'hsl(193,100%,26%)',
      900: 'hsl(193,100%,20%)'
    },
    blue: {
      50: 'hsl(213,52%,94%)',
      100: 'hsl(213,57%,86%)',
      200: 'hsl(213,54%,79%)',
      300: 'hsl(213,50%,71%)',
      400: 'hsl(213,47%,66%)',
      500: 'hsl(213,46%,63%)',
      600: 'hsl(213,39%,58%)',
      700: 'hsl(213,32%,52%)',
      800: 'hsl(213,29%,47%)',
      900: 'hsl(213,28%,37%)'
    },
    purple: {
      50: 'hsl(311,19%,91%)',
      100: 'hsl(311,20%,77%)',
      200: 'hsl(311,20%,63%)',
      300: 'hsl(311,23%,50%)',
      400: 'hsl(311,37%,40%)',
      500: 'hsl(311,58%,31%)',
      600: 'hsl(311,59%,28%)',
      700: 'hsl(311,63%,24%)',
      800: 'hsl(311,69%,21%)',
      900: 'hsl(311,86%,17%)'
    },
    pink: {
      50: 'hsl(353,35%,93%)',
      100: 'hsl(353,39%,83%)',
      200: 'hsl(353,34%,65%)',
      300: 'hsl(353,35%,52%)',
      400: 'hsl(353,57%,45%)',
      500: 'hsl(353,95%,37%)',
      600: 'hsl(353,100%,33%)',
      700: 'hsl(353,100%,30%)',
      800: 'hsl(353,100%,27%)',
      900: 'hsl(353,100%,25%)'
    }
  },
  fonts: {
    body: 'Assistant, sans-serif',
    heading: 'Source Sans Pro, sans-serif',
    title: 'Raleway, sans-serif',
    mono: 'Inconsolata, monospace'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem'
  },
  space: {
    px: '1px',
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.5rem',
    6: '2rem',
    7: '3rem',
    8: '4rem',
    9: '6rem',
    10: '8rem',
    11: '12rem',
    12: '16rem',
    13: '24rem',
    14: '32rem',
    15: '40rem',
    16: '48rem'
  }
}

export type ValueOf<T> = T[keyof T]

const colorChooser = (
  lightModeColor: ValueOf<typeof customTheme.colors>,
  darkModeColor: ValueOf<typeof customTheme.colors>
) => (colorMode: 'light' | 'dark') =>
  colorMode === 'light' ? lightModeColor : darkModeColor

const styled = (theme: CustomTheme): CustomTheme => ({
  ...theme,
  styles: {
    ...theme.styles,
    global: props => ({
      'html, body': {
        bg: colorChooser(
          theme.colors.lightModeBg,
          theme.colors.darkModeBg
        )(props.colorMode),
        color: colorChooser(
          theme.colors.lightModeText,
          theme.colors.darkModeText
        )(props.colorMode),
        transition: 'background-color 400ms ease, color 400ms ease'
      }
    })
  }
})

export default styled(customTheme)
