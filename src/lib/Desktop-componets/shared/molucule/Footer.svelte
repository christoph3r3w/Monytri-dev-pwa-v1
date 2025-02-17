
<script>
	import {Logo} from '$lib';

</script>

{#snippet about()}
	<li>about us</li>
	<li><a href=""></a></li>
	<li><a href=""></a></li>
	<li><a href=""></a></li>
{/snippet}

{#snippet social()}
	<li>social</li>
	<li><a href=""></a></li>
	<li><a href=""></a></li>
	<li><a href=""></a></li>
{/snippet}

{#snippet legal()}
	<li><a href=""></a></li>
	<li><a href=""></a></li>
	<li><a href=""></a></li>
	<li><a href=""></a></li>
{/snippet}

<menu>
	<figure>
		<Logo/>
	</figure>
	<nav>
		
		<ul>
			{@render about()}
		</ul>
		<ul>
			{@render social()}
		</ul>
	</nav>
</menu>

<nav>
	<ul>
		{@render legal()}
	</ul>
	<a href="#top">Back to top</a>
</nav>