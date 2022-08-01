import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#24C16B", // green
    secondary: "#0C381F",   // dark green

    green: "#66D59A",
    lightGreen: "#E6FEF0",

    lime: "#00BA63",
    emerald: "#2BC978",

    red: "#ED4756",
    lightRed: "#FFF1F0",

    purple: "#6B3CE9",
    lightpurple: "#F3EFFF",

    yellow: "#FFC664",
    lightyellow: "#FFF9EC",

    black: "#000000",
    white: "#FFFFFF",

    lightGray: "#FCFBFC",
    gray: "#C1C3C5",
    darkgray: "#C3C6C7",

    transparent: "transparent",
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const lightFONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 ,},
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

export const darkFONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55, color: COLORS.white },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 , color: COLORS.white},
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30, color: COLORS.white},
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22, color: COLORS.white },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22, color: COLORS.white },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36, color: COLORS.white },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30, color: COLORS.white },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22, color: COLORS.white },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22, color: COLORS.white },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22, color: COLORS.white },
};

const appTheme = { COLORS, SIZES, lightFONTS, darkFONTS };

export default appTheme;