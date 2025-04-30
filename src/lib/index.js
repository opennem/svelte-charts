/** @typedef {import('$lib/stores/chart.types').TimeSeriesData} TimeSeriesData */
/** @typedef {import('$lib/utils/si-units').SiPrefix} SiPrefix */
/** @typedef {{ data: TimeSeriesData, key?: string }} ChartEvent */
/** @typedef {{ key: symbol, title: string, prefix: SiPrefix, displayPrefix: SiPrefix, allowedPrefixes: SiPrefix[], baseUnit: string, chartStyles: { chartHeightClasses: string } }} ChartOptions */

import StratumChart from './StratumChart.svelte';
import ChartStore from './stores/chart.svelte';

export { StratumChart, ChartStore };
