<script>
	import {onMount} from 'svelte';
    import {onNavigate,afterNavigate} from '$app/navigation'
	import '../app.css';


	async function detectSWUpdate() {
		if ('serviceWorker' in navigator) {
			try {
				const registration = await navigator.serviceWorker.register('/service-worker.js', {
					scope: '/', // Explicitly set scope to root
					type: 'module'
				});
				
				registration.addEventListener('updatefound', () => {
					const newSW = registration.installing;
					newSW?.addEventListener('statechange', () => {
						if (newSW.state === 'installed') {
							if (confirm('A new version of the app is available. Reload to update?')) {
								newSW.postMessage({ type: 'SKIP_WAITING' });
								window.location.reload();
								return;
							}
						}
					});
				});
			} catch (error) {
				console.error('Service worker registration failed:', error);
			}
		}
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
	/* property that controls the toggle od desktop and mobile */
	/* and other styling properties */
	:root{
		--mobile:0;
		--body-padding: 3%;
		--header-height: 10dvh;
		--footer-height: 91px;

		@property --mobile{
			syntax: "<number>"; 
			initial-value: 0;
			inherits: true;
    	}
	}

	:global(.body-container){
		display: grid;
		grid-template-columns: var(--body-padding) [content-start] repeat(12,1fr) [content-end] var(--body-padding);
		grid-template-rows: [header-start] var(--header-height) [header-end main-start] 2fr [main-end footer-start] 15dvh [footer-end];
		min-height: 100dvh;
		background-color: var(--general-background-color);
	}

	:global(header){
		grid-row: header;
		grid-column: 1/-1;
		
		container-type: inline-size;
		container-name:header;

		/* header styling for when the --mobile property is = 1 */
		@container style(--mobile:1){
			display: grid;
			grid-template-columns: var(--body-padding) [content-start] repeat(6,1fr) [content-end] var(--body-padding);
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
		grid-row: main;
		grid-column: 1/-1;
		display: grid;
		grid-template-columns: subgrid;
		grid-template-rows: subgrid;
		align-content: start;
		min-height: 100dvh;
		overflow-y: hidden;
		overflow-x: hidden;

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
			overflow-x: hidden;

			/* background-color:  rgba(172, 255, 47, 0.582);
 */
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
			min-height: unset;
			margin-bottom: var(--footer-height);
			height: 300dvh;
			overflow-y: scroll;
			overflow-x: clip;
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

			background-color: var(--primary-green-500);
			grid-template-columns: var(--body-padding) [content-start] repeat(6,1fr) [content-end] var(--body-padding);
			grid-template-rows: 1fr .3fr;

			position: fixed;
			bottom: 0;
			right: 0;
			left: 0;
			height:clamp(50px, 16dvh, calc(71px + env(safe-area-inset-bottom)));	
			border-radius:var(--_nav-radius) var(--_nav-radius) 0 0;
		}
	}

	/* media query for mobile view */
	@media 
	/* screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3)and (orientation: portrait),  */
	(-webkit-min-device-pixel-ratio: 3),
	(-webkit-min-device-pixel-ratio: 2),
	screen and (device-width < 900px) and (orientation: portrait) , 
	screen and (device-height <= 900px) and (orientation: landscape),
	(device-width < 900px) and (orientation: portrait) , 
	(device-height <= 900px) and (orientation: landscape)
	{
		:root{
			--mobile:1;
			--body-padding: 5%;
		}
		
		.body-container{
			/*chris - greate a grid that would move */
			grid-template-columns: var(--body-padding) [content-start] repeat(6,1fr) [content-end] var(--body-padding);
			grid-template-rows: [header-start] clamp(50px, 10vh, 10vh) [header-end main-start] repeat(4,min(clamp(10px,.5fr,1fr))) [main-end footer-start] clamp(50px, 10vh, 10vh) [footer-end];
			overflow: hidden;
		}
	}
</style>
