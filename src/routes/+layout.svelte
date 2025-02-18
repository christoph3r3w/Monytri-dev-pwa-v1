<script>
	import { onMount } from 'svelte';
    import {onNavigate} from '$app/navigation'
	import {Header,Footer} from '$lib'
	import '../app.css';
	let { children } = $props();

	onNavigate((navigation) => {
        if(!document.startViewTransition){return};

        return new Promise((resolve) =>{
            document.startViewTransition(async ()=>{
                resolve();
                await navigation.complete;
            })
        })
    })


	async function detectSWUpdate(){
		const registration = await navigator.serviceWorker.ready;
		
		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					if (confirm('A new version of the app is available. Reload to update?')) {
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}

				
			});
		});
	}

	onMount(() => {detectSWUpdate()});

	console.log(
		'%c%s',
		'color: white; background: blue; font-size: 24px;',
		'PWA with service worker'
	);
	
</script>

<section class="body-container">
	<header>
		<Header/>
	</header>
	
	<main>
		{@render children()}
	</main>
	
	<footer>
		<Footer/>
	</footer>
</section>


<style>
	:root{
		--mobile:0;
		@property --mobile{
			syntax: "<number>"; 
			initial-value: 0;
			inherits: true;
    	}

	.body-container{
		display: grid;
		grid-template-columns: auto [content-start] repeat(12,1fr) [content-end] auto;
		grid-template-rows: [header-start] .15fr [header-end main-start] 2fr [main-end footer-start] 35vh [footer-end];
		min-height: 100dvh;
	}

	header{
		background-color: color-mix(in hsl,var(--general-background-color),rgb(188, 45, 45) 50%);
		grid-row: header-start/header-end;
		grid-column: 1/-1;
		@container style(--mobile:1){
			height: clamp(50px, 10vh, 10vh);
		}
	}
	main {
		background-color: var(--general-background-color);
		display: inline-block;
		height: 100%;
		grid-row: main-start/main-end;
	}

	footer{
		background-color: color-mix(in hsl,var(--general-background-color),rgba(67, 15, 15, 0.642) 80%);
		grid-row: footer-start/footer-end;
		grid-column: 1/-1;
	@media  (width < 900px) and (orientation: portrait), (height < 800px) and (orientation: landscape) {
		:root{
			--mobile:1;
			--body-padding: 5%;
		}
		
		.body-container{
			/*chris - greate a grid that would move */
			grid-template-columns: var(--body-padding) [content-start] repeat(6,1fr) [content-end] var(--body-padding);
			grid-template-rows: [header-start] 1fr [header-end main-start] 4fr [main-end footer-start] 1fr [footer-end];
			overflow: hidden;
		}

		main{
			min-height: unset;
			height: auto;
			overflow-y: scroll;
			overflow-x: clip;
			
		}

		footer{
			outline: solid 10px red;
			background-color: var(--primary-green-500);
		}
	}
</style>
