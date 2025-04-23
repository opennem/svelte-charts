<script>
	/** @typedef {import('$lib/stores/chart.types').TimeSeriesData} TimeSeriesData */
	/** @typedef {{ data: TimeSeriesData, key?: string }} ChartEvent */

	import StackedAreaLineChart from '$lib/components/StackedAreaLineChart.svelte';
	import ChartHeader from '$lib/components/ChartHeader.svelte';
	import ChartTooltip from '$lib/components/ChartTooltip.svelte';

	/** @type {{
		cxtKey: symbol,
		displayOptions?: boolean,
		showHeader?: boolean,
		showTooltip?: boolean,
		onmousemove?: (evt: ChartEvent | TimeSeriesData) => void,
		onmouseout?: () => void,
		onpointerup?: (evt: TimeSeriesData) => void,
		tooltipWrapperStyles?: string,
		chartPaddingClasses?: string
	}} */
	let props = $props();
	let { showHeader = true, showTooltip = true, chartPaddingClasses = 'px-6' } = props;
</script>

<div>
	{#if showHeader}
		<ChartHeader cxtKey={props.cxtKey} displayOptions={props.displayOptions} />
	{/if}
	{#if showTooltip}
		<div style="padding-right: var(--pad-right);">
			<ChartTooltip cxtKey={props.cxtKey} wrapperStyles={props.tooltipWrapperStyles} />
		</div>
	{/if}
	<div class={chartPaddingClasses}>
		<StackedAreaLineChart {...props} />
	</div>
</div>
