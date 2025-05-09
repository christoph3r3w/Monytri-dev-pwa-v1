<script>
	import { onMount } from 'svelte';
	import { PTest } from '$lib'
	import {current} from '$lib/store.js';
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Monytri</title>	
</svelte:head>
		<!-- <h1>Welcome to Monytri</h1>
		<p>We are a community of people who want to help each other out. We are not a bank, we are not a credit union, we are just a group of people who want to help each other out.</p>
		<p>We are not a bank, we are not a credit union, we are just a group of people who want to help each other out.</p> -->


<div class="home-wrapper">
	<section class="intro-view-section">
		<div class="balance-section">
			<div class="balance-info">
				<h1>&euro;{'1500.00'||'balance'}</h1>
				<p>Available Balance to Spend</p>
			</div>
			<a href="/add-money" class="add-money-link">
				svg + Add Money
			</a>
		</div>

		<nav class="button-container">
			<button onclick={goto("/gift")}>svg + send</button>
			<button onclick={goto("/request")} disabled>svg + request</button>
		</nav>
	</section>
	<br>
	<div class="button-conatiner-dev">
		<button onclick={goto("/gift")}>send a gift</button>
		<button onclick={goto("/request")} disabled>request a gift</button>
		<p>send feedback or issues here ⬇️</p>
		<a href="https://github.com/christoph3r3w/Monytri-dev-pwa-v1/issues/new">report issues </a>
	</div>
	<br>
	<PTest/>
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
	}
	
	.button-conatiner-dev :is(a,button) {
		font-size: 2rem;
		color: green;
		border: solid 2px ;
		border-radius: 8px;
		padding: 1rem 2rem;

		&:is(:hover,:focus-within,:active) {
			background-color: var(--primary-purple-400);
			color: white;
		}
	}

	.intro-view-section{
		display: none;
	}

	:global(html:has(.home-wrapper) ) {
		@media (-webkit-min-device-pixel-ratio: 3),
		(pointer: coarse) and (hover: none) and (min-resolution: 400dpi),
		screen and (device-width <= 900px) and (width <= 900px) and (orientation: portrait),
		screen and (device-height <= 900px) and (height <= 900px) and (orientation: landscape) {
			&{
				--body-padding: 0;
			}

			:global(header){
				--body-padding: 5% !important;
				z-index: 10;
				padding-inline: var(--body-padding) ;
				/* outline: solid red 5px; */
			}
			
			.intro-view-section{
				--_background-cut-off: 80%;
				position: sticky;
				top: 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 25dvh;
				background: linear-gradient(180deg, var(--primary-green-500) var(--_background-cut-off), transparent var(--_background-cut-off));
				z-index: 10;
				text-align: center;
			}

			.balance-section {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				color: var(--white);
				margin-top: -2rem;
			}

			.balance-section h1{
				font-size: clamp(1rem,36px,2.5rem);
				margin-bottom: 2% ;
			}

			.balance-info{
				font-size: clamp(10px,12px,12px);	
			}

			.add-money-link{
				border: solid var(--white) 2px;
				border-radius: 82px;
				padding: 16px 12px;
			}
			
			.button-container{
				display:flex;
				flex-direction: row;
				align-items: center;
				/* width: 248px; */
				width: clamp(1rem,64.4%,248px);
				height: 84px;
				justify-self: baseline;
				border-radius: 8px;
				background-color: white;
				background-color: var(--general-background-color);
				box-shadow: 0px 4px 10px 0px #5858581A ;
			}

			.button-container button{
				flex: 1 1 60%;
				display: flex;
				height: 100%;
				flex-direction: column;
				align-items: center;
				justify-content:space-around;
				color: var(--white);
				border: solid 2px ;
				border-radius: 8px;
				padding: 1% 2%;
				/* background-color: var(--primary-blue-500); */
				&:nth-of-type(1){
					background-color: var(--primary-green-500);
				}
				&:nth-of-type(2){
					background-color: var(--primary-purple-500);
				}
			}

			/* .button-conatiner{
				all: revert;
			} */

			.button-conatiner-dev{
				display: none;
			}
		}
	}	



</style>