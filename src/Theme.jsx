import { extendTheme } from "@mui/joy";

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                appTheme: {
                    50: '#CCD3DD',
                    100: '#B5BCCE',
                    200: '#9FA3BE',
                    300: '#8888AF',
                    400: '#72719F',
                    500: '#635B8F',
                    600: '#55447F',
                    700: '#492D6F',
                    800: '#3E175F',
                    900: '#35004E',
                    solidBg: 'var(--joy-palette-appTheme-800)',
                    solidActiveBg: 'var(--joy-palette-appTheme-500)',
                    outlinedBorder: 'var(--joy-palette-appTheme-500)',
                    outlinedColor: 'var(--joy-palette-appTheme-700)',
                    outlinedActiveBg: 'var(--joy-palette-appTheme-100)',
                    softColor: 'var(--joy-palette-appTheme-800)',
                    softBg: 'var(--joy-palette-appTheme-200)',
                    softActiveBg: 'var(--joy-palette-appTheme-300)',
                    plainColor: 'var(--joy-palette-appTheme-700)',
                    plainActiveBg: 'var(--joy-palette-appTheme-100)',
                    solidColor: "white"
                }
            }
        }
    },
    components: {
        JoyButton: {
            styleOverrides: {
                root: () => ({
                    borderRadius: '4px'
                })
            }
        }
    }
})

export default theme;
