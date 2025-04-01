<script>
	import { onMount} from 'svelte';
  import {onNavigate,afterNavigate} from '$app/navigation'
	import {Header,Footer,Menu} from '$lib'
	import {current,isMobile,menuOpen} from '../lib/store.js'
	import '../app.css';
  
	let { children } = $props();

	let menu_Open = $derived($menuOpen);

	// function to detect service worker update
	async function detectSWUpdate(){
		const registration = await navigator.serviceWorker.ready;
		
		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					if (confirm('A new version of the app is available. Reload to update?')) {
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
						return
					}
				}
			});
		});

	}

	// function to detect the current page
	function currentPage(){
		const currentPath = window.location.pathname;

		switch(currentPath){
			case '/':
				current.set('home');
				break;
			case '/gift':
				current.set('gift');
				break;
			case '/how-it-works':
				current.set('how-it-works');
				break;
			case '/learn-more':
				current.set('learn-more');
				break;
			case '/transactions':
				current.set('transactions');
				break;
			case '/stock-overview':
				current.set('stock');
				break;
			case '/inbox':
				current.set('inbox');
				break;
			case '/profile':
				current.set('profile');
				break;
			default:
				current.set('/');
				break;
		}
		return
	}
	
	$effect(() => {
		detectSWUpdate();

		// Function to update isMobile store value
		const updateIsMobile = () => {
			isMobile.set(getComputedStyle(document.documentElement).getPropertyValue('--mobile') === '1');
			currentPage();
		};

		// Debounce the updateIsMobile function to prevent it from running too frequently
		const debouncedUpdateIsMobile = debounce(updateIsMobile, 100);

		// Run updateIsMobile immediately on mount
		updateIsMobile();

		// Use ResizeObserver to update isMobile when the viewport size changes
		const resizeObserver = new ResizeObserver(() => {
			debouncedUpdateIsMobile();
		});

		// Listen for page navigation
		window.addEventListener('resize', updateIsMobile);
		window.addEventListener('load', updateIsMobile);
		// window.addEventListener('load', currentPage);

		 // Listen for page navigation
		window.addEventListener('popstate', () => {
			currentPage();
		});

		window.addEventListener('resize', debouncedUpdateIsMobile);
		
		// Handle orientation change explicitly (useful for mobile)
		window.addEventListener('orientationchange', debouncedUpdateIsMobile);
		
		// Run when page fully loads (including all resources)
		const handleFullPageLoad = () => {
			console.log('Page fully loaded with all resources');
			updateIsMobile(); // Update mobile detection after full page load
		};
		
		// Check if page is already loaded
		if (document.readyState === 'complete') {
			handleFullPageLoad();
		} else {
			window.addEventListener('load', handleFullPageLoad);
		}
		
		// Simple debounce function (if you don't already have one)
		function debounce(func, wait) {
			let timeout;
			return function executedFunction(...args) {
				const later = () => {
					clearTimeout(timeout);
					func(...args);
				};
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
			};
		}
		
		// Cleanup function
		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('orientationchange', updateIsMobile);
			window.removeEventListener('load', handleFullPageLoad);
			window.removeEventListener('popstate', currentPage);
		};
	});

	// onNavigate((navigation) => {
    //     if(!document.startViewTransition){return};

    //     return new Promise((resolve) =>{
    //         document.startViewTransition(async ()=>{
    //             resolve();
    //             await navigation.complete;
    //         })
    //     })
    // })

	afterNavigate(() => {
		currentPage();
	});

	// loggoing the current store value
	current.subscribe(value => {
		console.log('Current store value:', value);
	});

	isMobile.subscribe(value => {
		console.log('isMobile store value:', value);
	});
	
	// header section 
	import {Logo} from '$lib'

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

<!-- header section -->
{#snippet routes()}
	<li><a href="/">home</a></li>
	<li><a href="/gift">Gift</a></li>
	<li><a href="/how-it-works">how it works</a></li>
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

<!-- header section -->

<section class="body-container">
	<!-- {#if ($current == 'gift' && $isMobile) }
	{:else} -->
	<header>
		<!-- /<Header {current}/>	 -->
		<div class="header">
			<!-- {#if is_mobile == true } -->
				{@render mobileHeadNav()}
			<!-- {:else}
				{@render desktopNav()}
			{/if} -->
		</div>
	</header>
	<!-- {/if} -->
	{#if menu_Open}
		<Menu/>
	{/if}
	<main class={$current == 'gift'? 'giftOn':'' }>
		{@render children()}
	</main>
	<footer>
		<Footer {current}/>
	</footer>
</section>


<style >
	/* header section ///////////////////////////////////////////////////////// */
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
	/* header section ////////////////////////////////////////////////////*/

	:root{
		/* property that controls the toggle od desktop and mobile */
		--mobile:0;

		/* and other styling properties */
		--body-padding: 2%;
		--header-height: 10dvh;
		--footer-height: 91px;

		/* all the elements that will be animated */
		will-change: transform, height, background-color, box-shadow, border-radius,position;
		
		/* application general grid structure */
		--grid--mobile-collums: var(--body-padding) [content-start] repeat(6,1fr) [content-end] var(--body-padding);
		--grid-collums-gutter: 1rem;
		--grid-collums-rows: [header-start] var(--header-height) [header-end main-start] 2fr [main-end footer-start] minmax(316px,15dvh) [footer-end];
		--grid-collums-rows-gutter: 1rem;

		/* property that controls the toggle od desktop and mobile */
		@property --mobile{
			syntax: "<number>"; 
			initial-value: 0;
			inherits: true;
    	}
	}

	:global(*):is(:focus-visible) {
		outline: 2px solid var(--primary-orange-500);
		outline-offset: 2px;
	}

	:global(body){
		margin: 0;
		padding: 0;
		overflow-x: hidden;
		max-height:100svh;
		height: 100svh;

		@container style(--mobile:1){
			overflow: hidden;
		}
	}
	
	:global(.body-container){
		display: grid;
		grid-template-columns: var(--body-padding) [content-start] repeat(12,1fr) [content-end] var(--body-padding);
		grid-template-rows: [header-start] var(--header-height) [header-end main-start] min(calc(100dvh - var(--header-height)),100%) [main-end footer-start] minmax(316px,15dvh) [footer-end];
		min-height: 100dvh;
		background-color: var(--general-background-color);
		overflow-y: scroll;


		@container style(--mobile:1){
			/*chris - create a grid that would move */
			display:flex ;	
			flex-direction: column;		
			min-height: revert !important;
			max-height: 100%;
			overflow: hidden;
		}
	}
	
	:global(header){
		grid-row: header;
		grid-column: 1/-1;
		z-index: 100;
		
		container-type: inline-size;
		container-name:header;
		
		/* header styling for when the --mobile property is = 1 */
		@container style(--mobile:1){
			flex: 0 1 auto;
			display: grid;
			grid-template-columns: var(--grid--mobile-collums);
			grid-template-rows: 1fr;
			align-content: start;

			will-change: transform, height, background-color, box-shadow, border-radius,position;

			background-color: var(--primary-green-500);
			height: clamp(50px, 100%, var(--header-height));
			position: absolute;
			top: 0;
			inset-inline: 0;
			transform: translate3d(0,0,0);
		}
	}

	:global(main) {
		background-color: var(--general-background-color);
		grid-row: main;
		grid-column: content;
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
		align-content: start;
		overflow-y: visible;
		overflow-x: clip;
		
		container-name: main;

		/* grid positioning for all main content */
		&:nth-of-type(1)  {
			grid-row: main;
			display: grid;
			grid-template-columns: subgrid;
			align-content: start;
			overflow-y: hidden;
			overflow-x: clip;
			
			
		}
				
		&:nth-of-type(1) > :is(:global(*)) {
			grid-column: 1/ span 1;
			grid-row: 1/span 1;
			height: 100%;
		}

		&:nth-of-type(1):has(:global(*) ~ :global(*)) > :nth-child(n)  {
			grid-column: auto;
			grid-row: 1 / span 1;
			height: fit-content;
			text-wrap: nowrap;
			width: 100%;
			/* background-color: rgb(222, 135, 135); */
		}
		
		/* &:nth-of-type(1) :is(:global(*)) > *{
			grid-column: 1/-1;
			width: 100%;
			height: auto;
		} */
		
		/* main content layout styling for when the --mobile property is = 1 */
		@container style(--mobile:1){
				flex: 2 1 100svh;
				display: grid;
				grid-template-columns: var(--grid--mobile-collums) !important;
				grid-auto-flow: row;
				min-height: revert !important;
				max-height: 100%;
				overflow-y: scroll ;
				padding-top: calc(var(--header-height) + 1px);
				padding-bottom:1rem ;
				margin-bottom: -1rem;
				/* background-color: rgb(61, 112, 153); */

			&.giftOn{
				padding-top: 0 !important;
			}
			
			&:nth-child(n) > :is(:global(*)) {
				grid-column: content ;
				grid-row: revert;
				height: 100%;
				display: grid;
				grid-template-columns: subgrid;
				grid-template-rows: auto;
				overflow-x: clip;
				/* outline: solid rgb(55, 0, 255); */
			}
			
			&:nth-of-type(1) {
				grid-column: content ;
				overflow-y: scroll;
				/* background-color:  rgb(55, 0, 255); */
			}

			&:nth-child(n) > .home-wrapper{
				grid-column: content ;
			}
		}
	}

	:global(footer){
		position: relative;
		grid-row: footer;
		grid-column: 1/-1;
		display: grid;
		grid-template-columns: subgrid;
		
		container-type: inline-size;
		container-name: footer;
		
		/* footer styling for when the --mobile property is = 1 */
		@container style(--mobile:1){
			--_nav-radius: clamp(8px,8px,8pc);
			flex: 0 1 auto;
			background-color: var(--primary-green-500);
			grid-template-columns: var(--grid--mobile-collums);
			grid-template-rows: 1fr .3fr;

			position: relative;
			bottom: -1px;
			right: 0;
			left: 0;
			height:clamp(50px, 16dvh, 91px);
			border-radius:var(--_nav-radius) var(--_nav-radius) 0 0;
			transform: translate3d(0,0,0);
			will-change: transform, height, background-color, box-shadow, border-radius,position;

		}
	}

	/* media query for mobile view */
	@media 
	(-webkit-min-device-pixel-ratio: 3),
	screen and (device-width < 900px) and (orientation: portrait) , 
	screen and (device-height <= 900px) and (orientation: landscape)
	{
		:root{
			--mobile:1;
			--body-padding: 5%;
		}
	}

</style>
