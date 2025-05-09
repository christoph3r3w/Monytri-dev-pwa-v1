<script>
	import {current} from '$lib/store.js';
	import {Menu} from '$lib'
</script>

<div>
	<Menu></Menu>
</div>

<style>
	div{
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		display: flex;
		flex-direction: column;
		align-content: start;
		width: 100%;
		max-height: calc(120dvh - var(--footer-height)) ;
		/* padding-bottom: calc(var(--header-height) + env(safe-area-inset-bottom)); */
	}
</style>