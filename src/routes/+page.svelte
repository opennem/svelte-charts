<script>
	import { setContext, getContext, onMount } from 'svelte';
	import { StratumChart, ChartStore } from '$lib';
	import {
		tsData,
		seriesNames,
		seriesColours,
		seriesLabels,
		xTicks,
		formatX,
		formatTick
	} from './timeseries-data.js';

	/** @typedef {import('$lib/utils/si-units').SiPrefix} SiPrefix */
	/** @type {{ key: symbol, title: string, prefix: SiPrefix, displayPrefix: SiPrefix, allowedPrefixes: SiPrefix[], baseUnit: string, chartStyles: { chartHeightClasses: string } }} */
	let initChartOptions = {
		key: Symbol('power-energy-chart'),
		title: 'Generation',
		prefix: 'M',
		displayPrefix: 'M',
		allowedPrefixes: ['M', 'G'],
		baseUnit: 'W',
		chartStyles: { chartHeightClasses: 'h-[400px] md:h-[450px]' }
	};

	setContext(initChartOptions.key, new ChartStore(initChartOptions));

	onMount(() => {
		let chartCxt = getContext(initChartOptions.key);

		chartCxt.seriesData = tsData.map((d) => ({
			...d,
			date: new Date(d.date)
		}));
		chartCxt.seriesNames = seriesNames;
		chartCxt.seriesColours = seriesColours;
		chartCxt.seriesLabels = seriesLabels;

		chartCxt.xTicks = xTicks;
		chartCxt.formatX = formatX;
		chartCxt.formatTickX = formatTick;
	});
</script>

<div class="max-w-screen-lg mx-auto">
	<StratumChart cxtKey={initChartOptions.key} />
</div>
