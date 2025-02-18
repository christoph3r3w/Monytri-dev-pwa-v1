
<script>
	import {Logo} from '$lib'

</script>

<div>
	<nav>
		<Logo/>
	</nav>
	<nav>
		<menu>
			<li><a href="/">home</a></li>
			<li><a href="/gift">gift</a></li>
			<li><a href="/how it works">howit works</a></li>
			<li><a href="/learn more">learn more</a></li>
		</menu>
	</nav>
	<nav>
		<figure><img src="generic.png" alt="generic person"></figure>
	</nav>
</div>

<style>
	h1{
		color: red;
	@container style(--mobile:1){
		.header{
			background-color: var(--primary-green-500);
			border-bottom: none;
		}

		nav:is(:nth-of-type(1),:nth-of-type(2)){
			display: none;
		}
	}
</style>
	