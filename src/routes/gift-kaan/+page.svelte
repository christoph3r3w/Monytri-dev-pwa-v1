<script>
	import {current} from '$lib/store.js';

let explain = `
	1. make function in +page.js that takes in all the section from the backend.
	2. it should be a series that cronologicly swap when the previos one is valid
	3. when the user makes a selection and it is valid they can continue to the next form until there is none 
	4. lasty comes the payment
	5. the user can also go back to the previous form
	6. if the payment and forms are valid they can "confirm" submit and recieve a completion screen 
`
</script>
<svelte:head>
	<title>{$current}</title>	
</svelte:head>

<section class="transfer-wizard">
  <div class="left-step">
    <a href="/" aria-label="Back">
      <svg width="31px" height="26px" viewBox="0 0 31px 26px" fill="none" xmlns="http://www.w3.org/2000/svg" title="Back">
        <path d="M31.0005 11.3326H6.69055L15.5122 2.51096L13.1555 0.154297L0.310547 12.9993L13.1555 25.8443L15.5122 23.4876L6.69055 14.666H31.0005V11.3326Z" fill="black"/>
      </svg>
    </a>
    <h1> Choose Recipient </h1>
    <p> Please select your recipient to send to. </p>
    
    <input type="search" placeholder="Search Recipients" />
    <svg class="search-icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.295 27.705L23.5335 21.9435C25.4595 19.659 26.625 16.7145 26.625 13.5C26.625 6.2625 20.7375 0.375 13.5 0.375C6.2625 0.375 0.375 6.2625 0.375 13.5C0.375 20.7375 6.2625 26.625 13.5 26.625C16.7145 26.625 19.659 25.4595 21.9435 23.5335L27.705 29.295C27.924 29.514 28.212 29.625 28.5 29.625C28.788 29.625 29.076 29.5155 29.295 29.295C29.7345 28.857 29.7345 28.1445 29.295 27.705ZM2.625 13.5C2.625 7.503 7.503 2.625 13.5 2.625C19.497 2.625 24.375 7.503 24.375 13.5C24.375 19.497 19.497 24.375 13.5 24.375C7.503 24.375 2.625 19.497 2.625 13.5Z" fill="#A0A0A0"/>
    </svg>
      
  </div>

  <!-- the class was at the wrong element  -->
  <div class="right-step">
    <ul class="recipient-list">
      <li>
        <button href="/">
          <img src="generic.png" height="72" width="72" alt="">
          <div class="recipient-info">
            <h2> Recipient </h2>
            <p class="mail"> Recipient@gmail.com</p>
          </div>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </button>
      </li>
      <li>
        <button href="/">
          <img src="generic.png" height="72" width="72" alt="">
          <div class="recipient-info">
            <h2> Recipient </h2>
            <p class="mail"> Recipient@gmail.com</p>
          </div>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </button>
      </li>
      <li>
        <button href="/">
          <img src="generic.png" height="72" width="72" alt="">
          <div class="recipient-info">
            <h2> Recipient </h2>
            <p class="mail"> Recipient@gmail.com</p>
          </div>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </button>
      </li>
      <li>
        <button href="/">
          <img src="generic.png" height="72" width="72" alt="">
          <div class="recipient-info">
            <h2> Recipient </h2>
            <p class="mail"> Recipient@gmail.com</p>
          </div>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </button>
      </li>
      <li>
        <button href="/">
          <img src="generic.png" height="72" width="72" alt="">
          <div class="recipient-info">
            <h2> Recipient </h2>
            <p class="mail"> Recipient@gmail.com</p>
          </div>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </button>
      </li>
      <li>
        <button href="/">
          <img src="generic.png" height="72" width="72" alt="">
          <div class="recipient-info">
            <h2> Recipient </h2>
            <p class="mail"> Recipient@gmail.com</p>
          </div>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </button>
      </li>
    </ul>
  </div>
  <a href="/" class="continue-btn button-container"> Continue </a>
</section>

<style>
  .transfer-wizard {
    margin: 2rem;
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / 1;
		display: grid;
		grid-template-columns: 
		subgrid 
		[left-start] repeat(6,[mid-left]) [left-end right-start] repeat(6,[mid-right]) [right-end];
		width: 100%;

		container-type:normal;
		container-name: transfer-wizard;

		@container style(--mobile:1) {
			max-height: calc(100dvh - var(--footer-height)) !important;
			grid-template-rows: auto;
		}
	}

  .left-step {
		position: relative;
		grid-column: left;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
    padding-left: 2rem;

		@container style(--mobile:1) {
			height: fit-content;
		}

    a {
      position: absolute;
      top: 0;
      left: -2rem;
    }

    h1 { 
      margin-top: 2rem;
      font-size: 4.16rem;
      margin-bottom: 12px;
    }

    p {
      font-size: 2rem;
      max-width: 472px;
      margin-bottom: 29px;
    }

    input[type="search"] {
      padding: 24px;
      border-radius: 96px;
      width: 514px;
      height: 60px;
    }

    input[type="search"]::placeholder {
      padding-left: 32px;
    }

    .search-icon{
      position: relative;
      top: -45px;
      left: 1rem;
    }
	}

	.right-step {
		position: relative;
		grid-column: right;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		
		@container style(--mobile:1) {
			max-height: fit-content;
			width: 100% ;
		}
	}

  .button-container {
		position: relative;
		grid-column: 9;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;

		@container style(--mobile:1) {
			flex: 1 2 15%;
			flex-direction: column-reverse;
			align-self: self-end;
		}
	}

  a {
    height: 40px;
    width: 40px;
  }

  .recipient-list {
    padding: 2rem;
    background-color: #FFFFFF;
    height: 658px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: clip;
    border-radius: 4px;

    li {
      margin-bottom: 24px;
      padding: 12px;
      border-bottom: 2px solid #CFCFCF;

      .recipient-info{
        display: flex;
        flex-direction: column;
      }
    }

    li:has(button:focus), li:has(button:hover) {
      outline: 4px solid #497951;
      border-radius: 8px;
    }

    button:focus, button:hover{
      outline: none;
    }

    button {
      width: 455px;
      height: 72px;

      img {
        border-radius: 50%;
        height: 72px;
        width: 72px;
        margin-right: 16px;
      }

      img, .recipient-info {
        display: inline-block;
        vertical-align: middle;
      }

      h2 {
        font-size: 2rem;
        margin: 0;
        padding: 0;
      }

      p {
        font-size: 1rem;
        margin: 0;
        padding: 6px 0 0 0;
      }

      .last-sent {
        font-size: 1rem;
        margin: 0;
        padding: 24px 0 0 0;
      }
    }
  }

  .continue-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #717171;
    border-radius: 8px;
    width: 359px;
    height: 56px;
    padding: 16px 130px;
    text-decoration: none;
    font-size: 2rem;
  }
</style>