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
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" class="search-icon">
      <path fill="#A0A0A0" d="m29.295 27.705-5.762-5.761a13.058 13.058 0 0 0 3.092-8.444C26.625 6.263 20.738.375 13.5.375 6.263.375.375 6.263.375 13.5c0 7.238 5.888 13.125 13.125 13.125 3.215 0 6.159-1.166 8.444-3.091l5.761 5.761a1.122 1.122 0 0 0 1.59 0c.44-.438.44-1.15 0-1.59ZM2.625 13.5c0-5.997 4.878-10.875 10.875-10.875S24.375 7.503 24.375 13.5 19.497 24.375 13.5 24.375 2.625 19.497 2.625 13.5Z"/>
    </svg>
  </div>

  <!-- the class was at the wrong element  -->
  <div class="right-step">
    <ul class="recipient-list">
      <li>
        <button>
          <img src="generic.png" height="72" width="72" alt="">
          <div class="recipient-info">
            <h2> Recipient </h2>
            <p class="mail"> Recipient@gmail.com</p>
          </div>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </button>
      </li>
      <li>
        <button>
          <img src="generic.png" height="72" width="72" alt="">
          <div class="recipient-info">
            <h2> Recipient </h2>
            <p class="mail"> Recipient@gmail.com</p>
          </div>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </button>
      </li>
      <li>
        <button>
          <img src="generic.png" height="72" width="72" alt="">
          <div class="recipient-info">
            <h2> Recipient </h2>
            <p class="mail"> Recipient@gmail.com</p>
          </div>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </button>
      </li>
      <li>
        <button>
          <img src="generic.png" height="72" width="72" alt="">
          <div class="recipient-info">
            <h2> Recipient </h2>
            <p class="mail"> Recipient@gmail.com</p>
          </div>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </button>
      </li>
      <li>
        <button>
          <img src="generic.png" height="72" width="72" alt="">
          <div class="recipient-info">
            <h2> Recipient </h2>
            <p class="mail"> Recipient@gmail.com</p>
          </div>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </button>
      </li>
      <li>
        <button>
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
      margin-bottom: .75rem;
    }

    p {
      font-size: 2rem;
      max-width: 29.5rem;
      margin-bottom: 1.813rem;
    }

    input[type="search"] {
      padding: 1.5rem;
      border-radius: 6rem;
      width: 32.125rem;
      height: 3.75rem;
    }

    input[type="search"]::placeholder {
      padding-left: 2rem;
    }

    .search-icon{
      position: relative;
      top: -2.813rem;
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

    .recipient-list {
      padding: 2rem;
      background-color: #FFFFFF;
      height: 41.125rem;
      width: 100%;
      overflow-y: scroll;
      overflow-x: clip;
      border-radius: .25rem;

      li:has(button:focus), li:has(button:hover) {
        outline: .25rem solid #497951;
        border-radius: .5rem;
      }

      li {
        margin-bottom: 1.5rem;
        padding: .75rem;
        border-bottom: .125rem solid #CFCFCF;

        button:focus, button:hover{
          outline: none;
        }

        img {
          border-radius: 50%;
          height: 4.5rem;
          width: 4.5rem;
        }

        img, .recipient-info {
          display: inline-block;
          vertical-align: middle;
        }

        .recipient-info {
          margin-left: 1rem;

          h2 {
            font-size: 2rem;
            margin: 0 0 0 -1rem;
            padding: 0;
          }

          p {
            font-size: 1rem;
            margin: 0;
            padding: .375rem 0 0 .375rem;
          }
        }

        .last-sent {
          font-size: 1rem;
          margin: 0 0 0 -5rem;
          padding: 1.5rem 0 0 0;
        }
      }
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
    height: 2.5rem;
    width: 2.5rem;
  }

  .continue-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #717171;
    border-radius: .5rem;
    width: 22.438rem;
    height: 3.5rem;
    padding: 1rem 8.125rem;
    text-decoration: none;
    font-size: 2rem;
  }
</style>