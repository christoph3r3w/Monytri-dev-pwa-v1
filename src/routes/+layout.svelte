<script>
	import { onMount } from 'svelte';
    import {onNavigate,afterNavigate} from '$app/navigation'
	import {Header,Footer} from '$lib'
	import {current,isMobile} from '../lib/store.js'
	import '../app.css';
	let { children } = $props();



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
		
		current.subscribe(value => {
			console.log('Current store value:', value);
			
		});
		return
	}

	
	onMount(() => {
		detectSWUpdate()
		console.log(
			'%c%s',
			'color: white; background: blue; font-size: 24px;',
			'PWA with service worker and page transition on android',
		);

		const updateIsMobile = () => {
			isMobile.set(getComputedStyle(document.documentElement).getPropertyValue('--mobile') === '1');
		};

		updateIsMobile();
		window.addEventListener('resize', updateIsMobile);

		return () => {
			window.removeEventListener('resize', updateIsMobile);
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


	
</script>

<section class="body-container">
	<header>
		<Header>
			<!-- {#snippet navigation()} -->
		</Header>
	</header>
	
	<main>
		{@render children()}
	</main>
	
	<footer>
		<Footer/>
	</footer>
</section>


<style >

	:root{
		--mobile:0;
		--body-padding: 3%;

		@property --mobile{
			syntax: "<number>"; 
			initial-value: 0;
			inherits: true;
    	}
	}

	:global(.body-container){
		display: grid;
		grid-template-columns: var(--body-padding) [content-start] repeat(12,1fr) [content-end] var(--body-padding);
		grid-template-rows: [header-start] 9dvh [header-end main-start] 2fr [main-end footer-start] 35dvh [footer-end];
		min-height: 100dvh;
	}

	header{
		background-color: var(--general-background-color);
		grid-row: header;
		grid-column: 1/-1;

		/* &:first-child{container-name:header;} */

		@container style(--mobile:1){
			background-color: var(--primary-green-500);
			height: clamp(50px, 10dvh, 10dvh);
			position: fixed;
			top: 0;
			inset-inline: 0;
		}
	}

	main {
		background-color: var(--general-background-color);
		display: grid;
		grid-template-columns: subgrid;
		min-height: 100dvh;
		grid-row: main;
		grid-column: 1/-1;
		
		container-name: main;

		> :nth-child(n){
			grid-column: content;
		}

		@container style(--mobile:1){
			min-height: unset;
			height: 300dvh;
			overflow-y: scroll;
			overflow-x: clip;
		}
		
	}

	footer{
		background-color: color-mix(in hsl,var(--general-background-color),rgba(67, 15, 15, 0.642) 80%);
		grid-row: footer;
		grid-column: 1/-1;
		display: grid;
		grid-template-columns: subgrid;
		
		container-type: inline-size;
		container-name:footer;
		
		@container style(--mobile:1){
			--_nav-radius: clamp(8px,8px,8pc);

			background-color: var(--primary-green-500);
			grid-template-columns: var(--body-padding) [content-start] repeat(6,1fr) [content-end] var(--body-padding);
			grid-template-rows: 1fr;

			position: fixed;
			bottom: 0;
			inset-inline: 0;
			height:clamp(50px, 10dvh, 10dvh);
			border-radius:var(--_nav-radius) var(--_nav-radius) 0 0;

		}
	}

	/* media query for mobile view */
	@media  (width < 900px) and (orientation: portrait), (height < 800px) and (orientation: landscape) {
		:root{
			--mobile:1;
			--body-padding: 5%;
		}
		
		.body-container{
			/*chris - greate a grid that would move */
			grid-template-columns: var(--body-padding) [content-start] repeat(6,1fr) [content-end] var(--body-padding);
			grid-template-rows: [header-start] clamp(50px, 10vh, 10vh) [header-end main-start] 4fr [main-end footer-start] clamp(50px, 10vh, 10vh) [footer-end];
			overflow: hidden;
		}
	}
</style>
