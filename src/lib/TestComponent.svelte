<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} greeting
	 */

	/** @type {Props} */
	let { greeting } = $props();
</script>

<div>
	<h1>{greeting}, world!</h1>
</div>

<style>
	div {
		background-color: steelblue;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 1rem;
		min-height: 100vh;
		color: white;
		font-size: 2rem;
	}
	h1 {
		font-variant-caps: petite-caps;
	}
</style>
