import type {} from "@mui/material/themeCssVarsAugmentation";
import { ThemeOptions } from "@mui/material/styles";
import { getDesignTokens } from "./themePrimitives";
import {
  inputsCustomizations,
  dataDisplayCustomizations,
  feedbackCustomizations,
  navigationCustomizations,
  surfacesCustomizations,
} from "./customizations";

export default function getSignInSideTheme(mode?: any): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      // ...inputsCustomizations,
      // ...dataDisplayCustomizations,
      // ...feedbackCustomizations,
      // ...navigationCustomizations,
      // ...surfacesCustomizations,
    },
  };
}
