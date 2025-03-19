<script>
	import { onMount} from 'svelte';
    import {onNavigate,afterNavigate} from '$app/navigation'
	import {Header,Footer} from '$lib'
	import {current,isMobile,menuOpen} from '../lib/store.js'
	import '../app.css';
	let { children } = $props();

	let menu_Open = $derived($menuOpen);

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
		
		const updateIsMobile = () => {
			isMobile.set(getComputedStyle(document.documentElement).getPropertyValue('--mobile') === '1');
		};

		// Run updateIsMobile immediately on mount
		updateIsMobile();

		currentPage();

		window.addEventListener('resize', updateIsMobile);
		// window.addEventListener('load', updateIsMobile);
		// window.addEventListener('load', currentPage);

		 // Listen for page navigation
		window.addEventListener('popstate', () => {
			// Update current page in store when navigation happens
			currentPage();
		});
		
		// Also run when window resizes
		window.addEventListener('resize', updateIsMobile);
		
		// Run when page fully loads (including all resources)
		const handleFullPageLoad = () => {
			console.log('Page fully loaded with all resources');
			updateIsMobile(); // Update mobile detection after full page load
			// Any other code you want to run after page is fully loaded
		};
		
		// Check if page is already loaded
		if (document.readyState === 'complete') {
			handleFullPageLoad();
		} else {
			window.addEventListener('load', handleFullPageLoad);
		}
		
		// Cleanup function
		return () => {
			window.removeEventListener('resize', updateIsMobile);
			window.removeEventListener('load', handleFullPageLoad);
			window.removeEventListener('popstate', currentPage);
		};
	});

	onNavigate((navigation) => {
        if(!document.startViewTransition){return};

        return new Promise((resolve) =>{
            document.startViewTransition(async ()=>{
                resolve();
                await navigation.complete;
            })
        })
    })

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
	
</script>

<section class="body-container">
	<header>
		<Header {current}/>	
	</header>
	
	<main>
		{@render children()}
	</main>
	
	<footer>
		<Footer {current}/>
	</footer>
</section>


<style >
	:root{
		/* property that controls the toggle od desktop and mobile */
		--mobile:0;

		/* and other styling properties */
		--body-padding: 3%;
		--header-height: 10dvh;
		--footer-height: 91px;
		
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

	:global(.body-container){
		display: grid;
		grid-template-columns: var(--body-padding) [content-start] repeat(12,1fr) [content-end] var(--body-padding);
		grid-template-rows: [header-start] var(--header-height) [header-end main-start] 2fr [main-end footer-start] minmax(316px,15dvh) [footer-end];
		min-height: 100dvh;
		background-color: var(--general-background-color);

		@container style(--mobile:1){
			/*chris - create a grid that would move */
			display:flex ;	
			flex-direction: column;		
			overflow: hidden;
		}
	}
	
	:global(header){
		grid-row: header;
		grid-column: 1/-1;
		
		container-type: inline-size;
		container-name:header;
		
		/* header styling for when the --mobile property is = 1 */
		@container style(--mobile:1){
			flex: 0 1 auto;
			display: grid;
			grid-template-columns: var(--grid--mobile-collums);
			grid-template-rows: 1fr;
			align-content: start;
			
			background-color: var(--primary-green-500);
			height: clamp(50px, 100%, var(--header-height));
			position: fixed;
			top: 0;
			inset-inline: 0;
		}
	}

	:global(main) {
		background-color: var(--general-background-color);
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
		align-content: start;
		min-height: 100dvh;
		overflow-y: hidden;
		overflow-x: clip;
		
		container-name: main;
		
		/* grid positioning for all main content */
		&:nth-child(n){
			grid-column: content;
			grid-row: main;
			display: grid;
			grid-template-columns: subgrid;
			grid-template-rows: auto;
			align-content: start;
			overflow-y: hidden;
			overflow-x: clip;

			/* background-color:  rgba(172, 255, 47, 0.582); */
		}
		
		&:nth-child(n) > .home-wrapper{
			grid-column: 1/-1;
			grid-row: main;
			display: grid;
			grid-template-columns: subgrid;
			align-content: start;
			width: 100%;
			height: auto;
		}
		
		&:nth-child(n) > :is(:global(*)) {
			grid-column: 1/-1;
			grid-row: auto;
			/* outline: solid rgb(55, 0, 255); */
		}
		
		&:nth-child(n) * > *{
			grid-column: 1/-1;
			width: 100%;
			height: auto;
			/* outline: solid red; */
		}
		
		/* main content layout styling for when the --mobile property is = 1 */
		@container style(--mobile:1){

			&{
				flex: 3 1 100dvh;
				grid-template-columns: var(--grid--mobile-collums) !important;
				min-height: revert !important;
				max-height: 100%;
				overflow-y: scroll !important;
				padding-top: calc(var(--header-height) + 1rem);
				padding-bottom: 1rem;
			}
			
			&:nth-child(n) > :is(:global(*)) {
				grid-column: content ;
				grid-row: revert;
				
				display: grid;
				grid-template-columns: subgrid;
				grid-template-rows: auto;
				overflow-y: scroll;
				overflow-x: clip;
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
			bottom: 0;
			right: 0;
			left: 0;
			height:clamp(50px, 16dvh, 91px);
			border-radius:var(--_nav-radius) var(--_nav-radius) 0 0;
		}
	}

	/* media query for mobile view */
	@media 
	/* screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3)and (orientation: portrait),  */
	(-webkit-min-device-pixel-ratio: 3),
	screen and (device-width < 900px) and (orientation: portrait) , 
	screen and (device-height <= 900px) and (orientation: landscape),
	(device-width < 900px) and (orientation: portrait) , 
	(device-height <= 900px) and (orientation: landscape)
	{
		:root{
			--mobile:1;
			--body-padding: 5%;
		}
	}
</style>
