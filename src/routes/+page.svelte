<script>
	import { onMount } from 'svelte';
	import { PTest,Balance_M,HomeArticles_M } from '$lib'
	import {current} from '$lib/store.js';
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Monytri</title>	
</svelte:head>

<div class="home-wrapper">

	
	<HomeArticles_M/>
	
	<div class="button-conatiner-dev">
		<button onclick={goto("/gift")}>send a gift</button>
		<button onclick={goto("/request")} disabled>request a gift</button>
		<p>send feedback or issues here ⬇️</p>
		<a href="https://github.com/christoph3r3w/Monytri-dev-pwa-v1/issues/new">report issues </a>
	</div>
	<br>
</div>

<style>
	.home-wrapper{
		grid-column: 1 / -1;
		grid-row: 1 / span 1;
		display: flex;
		flex-direction: column;
		align-content: start;
		width: 100%;
		min-height: calc(120cqh - var(--header-height));
		max-height: calc(120dvh - var(--footer-height)) ;
		padding-bottom: calc(var(--header-height) + env(safe-area-inset-bottom));
	}

	.button-conatiner-dev{
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 2rem;
		width: 100%;
		height: fit-content;
		margin-bottom: 5rem;
	}
	
	.button-conatiner-dev :is(a,button) {
		font-size: 2rem;
		border: solid 2px ;
		border-radius: 8px;
		padding: 1rem 2rem;

		&:is(:hover,:focus-within,:active) {
			background-color: var(--primary-purple-400);
			color: white;
		}
	}

	:global(.home-intro-section,.home-articles){
		display: none;
	}

	:global(html:has(.home-wrapper)){
		@media (-webkit-min-device-pixel-ratio: 3),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi),
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait),
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape) {
			&{
				--body-padding: 0;
				--header-intro-height: 27dvh;
				overflow-x: hidden;
			}

			:global(header,footer){
				--body-padding: 5% ;
				z-index: 10;
				/* padding-inline: var(--body-padding) ; */
				/* outline: solid red 5px; */
			}
	
			:global(.home-wrapper){
				padding-top: var(--header-intro-height);
			}
			
			div.button-conatiner-dev {
				position: relative;
				margin-inline: 5%;
				
				button{
					display: none;
				}
			}
		}
	}	



</style>