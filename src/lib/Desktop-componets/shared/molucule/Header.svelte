
<script>
	import {goto} from '$app/navigation';
	import {Logo} from '$lib'
	import {current,isMobile,menuOpen} from '$lib/store.js'

	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let is_mobile = $derived($isMobile);

	
	function iconTask (){
        if ($current === 'home') {
            // On homepage, activate search functionality
            console.log('Activating search');
        } else if ($current === 'gift') {
            history.back();
		} else {
            history.back();
		}
	}

	function toggleMenu(){
		menuOpen.set(!$menuOpen);
		console.log('menu open is',$menuOpen);
	}

	$effect(() => {
		console.log(is_mobile);
	});

</script>

{#snippet routes()}
	<li><a href="/">home</a></li>
c	<li><a href="/how-it-works">how it works</a></li>
	<li><a href="/learn-more">learn more</a></li>
{/snippet}

{#snippet desktopNav()}
	<nav class="logo">
		<Logo/>
	</nav>
	<nav class="menu">
		<menu>
			{@render routes()}
		</menu>
	</nav>
	<nav class="profile">
		<button onclick={toggleMenu}><img src="generic.png" alt="generic person"></button>
	</nav>
{/snippet}

{#snippet mobileHeadNav()}
	<!-- goback and search button -->
	 {#if $current === 'gift'}
	 <nav class="goBack">
		<button onclick={iconTask}>
			<svg width="9" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7.75 15.75a.744.744 0 0 1-.53-.22l-7-7a.75.75 0 0 1 0-1.06l7-7a.75.75 0 1 1 1.06 1.06L1.81 8l6.47 6.47a.75.75 0 0 1-.53 1.28Z" fill="white"/>
			</svg>
		</button>
	</nav>

	{:else}
	<nav class="goBack othr">
		<button onclick={iconTask}>
			
		{#if $current === 'home'}
			<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="m19.53 18.47-3.841-3.841A8.705 8.705 0 0 0 17.75 9C17.75 4.175 13.825.25 9 .25S.25 4.175.25 9 4.175 17.75 9 17.75a8.705 8.705 0 0 0 5.629-2.061l3.841 3.841a.748.748 0 0 0 1.06 0 .749.749 0 0 0 0-1.06ZM1.75 9c0-3.998 3.252-7.25 7.25-7.25S16.25 5.002 16.25 9 12.998 16.25 9 16.25 1.75 12.998 1.75 9Z" fill="white"/>
			  </svg>
		{:else}
			<svg width="9" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7.75 15.75a.744.744 0 0 1-.53-.22l-7-7a.75.75 0 0 1 0-1.06l7-7a.75.75 0 1 1 1.06 1.06L1.81 8l6.47 6.47a.75.75 0 0 1-.53 1.28Z" fill="white"/>
			  </svg>
		{/if}
		</button>
	</nav>
	<!-- page title -->
	<nav class="pageTitle">
		<h2>
			{$current}
		</h2>
	</nav>
	<!-- profile menu -->
	<nav class="profile">
		<a href="/profile"><img src="generic.png" alt="generic person"></a>
	</nav>
	{/if}
{/snippet}

<div class="header">
	{#if is_mobile == true || is_mobile == 1 || is_mobile == '1'|| is_mobile == 'true'}
		{@render mobileHeadNav()}
	{:else}
		{@render desktopNav()}
	{/if}
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		width: 100%;
		padding-inline: 1rem;
		gap: 1%;
		border-bottom: solid 2px color-mix(in hsl, var(--grey-400), white 80%);
		/* box-shadow: 0 10px 5px -10px var(--grey-400); */
	}

	nav {
		display: flex;
		align-items: center;
		height: 100%;
		gap: 1rem;
	}

	nav.logo{
		flex: 0 1 fit-content;
	}

	nav:nth-of-type(2){
		flex: 1 1 fit-content ;
		justify-content: end;

		@container (width < 730px){
			display: none;
		}
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

		& li :is(a,button){
			font-size: 1.5rem;
			text-transform: capitalize;
			color: var(--primary-green-500);
			text-wrap-mode: nowrap;
			word-wrap: normal;
			width: 100%;
		}

		& li:hover :is(a,button){
			text-decoration: underline !important ;
		}
	}

	.profile a{
		border-radius: 50%;
		width: 32px;
		height: 32px;
	}

	.profile img{
		width: clamp(100%, 100%, 65px);
		aspect-ratio: 1;
	}


	@container style(--mobile:1){
		.header{
			grid-column: content;
			grid-row: 1/-1;
			display: grid;
			grid-template-columns: 1fr 5fr 1fr;
			grid-template-rows: 1fr;
			width: 100%;
			height: 100%;
			border-bottom: none;
			padding-inline: 0 !important;
			/* outline: solid aqua; */
		}

		.goBack{
			display: flex;
			align-items: center;
			justify-content: start;
			padding-inline: 1rem;
			/* outline: solid yellow; */
		}
		
		.goBack button{
			display: grid;
			place-content: start;
			background: transparent;			
			border: none;
			border-radius: 8px;
			cursor: pointer;
			/* outline: solid rgb(0, 255, 13); */

			svg path{
				stroke: var(--off-white);
				fill: var(--off-white);
			}
		}


		nav:nth-of-type(2).pageTitle{
			display: flex;
			align-items: center;
			justify-content:center;
			/* outline: solid rgb(255, 0, 0); */
		}

		.pageTitle h2{
			font-size: clamp(1.4rem, 1vw, 1.8rem);
			font-weight: 300;
			text-transform: capitalize;
			color: var(--off-white);
			text-align: center;
			line-height: 120%;
			width: 100%;
			height: auto;
			word-wrap: none;
			text-wrap:none ;
			text-wrap-mode:nowrap ;
			/* outline: solid salmon; */
		}

		.profile{
			display: flex;
			align-items: center;
			justify-content: end;
			padding-inline: 1rem;
			/* outline: solid yellow; */
		}
	}
</style>
	