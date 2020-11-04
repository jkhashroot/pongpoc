import { multiply } from 'ramda';
import getRootElementFontSize from './getRootElementFontSize';


export const convertRem = value => multiply(value, getRootElementFontSize());
