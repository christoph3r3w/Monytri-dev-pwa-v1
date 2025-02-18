
<script>
	import {Logo} from '$lib'

</script>

{#snippet navigation()}
	<li><a href="/">home</a></li>
	<li><a href="/gift">gift</a></li>
	<li><a href="/how it works">how it works</a></li>
	<li><a href="/learn more">learn more</a></li>
{/snippet}

<div class="header">
	<nav>
		<Logo/>
	</nav>
	<nav>
		<menu>
			{@render navigation()}
		</menu>
	</nav>
	<nav>
		<a href="/"><img src="generic.png" alt="generic person"></a>
	</nav>
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 1rem;
		gap: 1%;
		border-bottom: solid 2px color-mix(in hsl, var(--grey-400), white 80%);
		box-shadow: 0 10px 5px -10px var(--grey-400);
	}

	nav {
		display: flex;
		align-items: center;
		height: 100%;
		gap: 1rem;
	}

	nav:nth-of-type(1){
		flex: 0 1 fit-content;
	}

	nav:nth-of-type(2){
		flex: 1 1 fit-content ;
		justify-content: end;
	}

	nav menu {
		display: inline-flex;
		min-width: fit-content;
		height: fit-content;
		
		li{
			display: flex;
			flex-wrap: nowrap;
			padding-inline: 1.5vw;
		}

		& li a{
			font-size: 1.5rem;
			text-transform: capitalize;
			color: var(--primary-green-500);
			text-wrap-mode: nowrap;
			word-wrap: normal;
			width: 100%;
		}

		& li:hover a{
			text-decoration: underline !important ;
		}
	}

	@container style(--mobile:1){
		.header{
			border-bottom: none;
		}

		nav:is(:nth-of-type(1),:nth-of-type(2)){
			display: none;
		}
	}
</style>
	