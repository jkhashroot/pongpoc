import { getElementFontSize } from './getElementFontSize';

export const emToPx = (val, context) => val * getElementFontSize(context);
