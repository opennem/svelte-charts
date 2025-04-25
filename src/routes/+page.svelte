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
	/** @typedef {import('$lib/stores/chart.types').TimeSeriesData} TimeSeriesData */
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
	let chartCxt = getContext(initChartOptions.key);
	onMount(() => {
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

	/**
	 * @param {string | undefined} hoverKey
	 * @param {TimeSeriesData | undefined} hoverData
	 */
	function updateChartHover(hoverKey, hoverData) {
		chartCxt.hoverTime = hoverData ? hoverData.time : undefined;
		chartCxt.hoverKey = hoverKey;
	}

	/**
	 * @param {number} time
	 */
	function updateChartFocus(time) {
		const isSame = chartCxt.focusTime === time;
		chartCxt.focusTime = isSame ? undefined : time;
	}

	/**
	 * @param {{ data: TimeSeriesData, key?: string } | TimeSeriesData} evt
	 */
	function onmousemove(evt) {
		if (!evt) return;
		let key = /** @type {string | undefined} */ (evt.key);
		let data = key
			? /** @type {TimeSeriesData | undefined} */ (evt.data)
			: /** @type {TimeSeriesData | undefined} */ (evt);
		updateChartHover(key, data);
	}

	function onmouseout() {
		updateChartHover(undefined, undefined);
	}

	/**
	 * @param {TimeSeriesData} evt
	 */
	function onpointerup(evt) {
		updateChartFocus(evt.time);
	}
</script>

<div class="max-w-screen-lg mx-auto">
	<StratumChart cxtKey={initChartOptions.key} {onmousemove} {onmouseout} {onpointerup} />
</div>
