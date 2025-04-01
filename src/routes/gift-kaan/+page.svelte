<script>
	import {current} from '$lib/store.js';

let explain = `
	1. make function in +page.js that takes in all the section from the backend.
	2. it should be a series of form that cronologicly swap when the previos one is valid
	3. when the user makes a selection and it is valid they can continue to the next form until there is none 
	4. lasty comes the payment
	5. the user can also go back to the previous form
	6. if the payment and forms are valid they can "confirm" submit and recieve a completion screen 
`
</script>
<svelte:head>
	<title>{$current}</title>	
</svelte:head>

<section>
  <a href="/" aria-label="Back">
    <svg width="31px" height="26px" viewBox="0 0 31px 26px" fill="none" xmlns="http://www.w3.org/2000/svg" title="Back">
      <path d="M31.0005 11.3326H6.69055L15.5122 2.51096L13.1555 0.154297L0.310547 12.9993L13.1555 25.8443L15.5122 23.4876L6.69055 14.666H31.0005V11.3326Z" fill="black"/>
    </svg>
  </a>

  <div>
    <h1> Choose Recipient </h1>
    <p> Please select your recipient to send to. </p>
    
    <input type="search" placeholder="Search Recipients" />
  </div>

  <div class="recipient-list">
    <ul>
      <li>
        <a href="/">
          <img src="#" height="72px" width="72px" alt="">
          <h2> Recipient </h2>
          <p> Recipient@gmail.com</p>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </a>
      </li>
      <li>
        <a href="/">
          <img src="#" height="72" width="72" alt="">
          <h2> Recipient </h2>
          <p> Recipient@gmail.com</p>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </a>
      </li>
      <li>
        <a href="/">
          <img src="/" height="72" width="72" alt="">
          <h2> Recipient </h2>
          <p> Recipient@gmail.com</p>
          <p class="last-sent"> Last sent: 12/12/2023</p>
        </a>
      </li>
    </ul>
  </div>
</section>

<style>
  section {
    display: grid;
    margin: 2rem;
  }

  a{
    height: 40px !important;
    width: 40px !important;
  }

  div {
    padding: 2rem;

    h1{ 
      font-size: 4.16rem;
      margin-bottom: 12px;
    }

    p{
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
  }

  .recipient-list {
    display: flex;
    flex-direction: column;
    grid-column: 3 !important;
    grid-row: 1/4;
    padding: 2rem;
    margin-left: 2rem;
    background-color: #FFFFFF;
    height: 658px !important;
    width: 601px !important;
    
    ul{
      padding: 1.2rem;
    }

    li {
      height: 495px;
      height: 152px;
      margin-bottom: 24px;
    }

    a {
      width: 455px !important;
      height: 72px !important;

      img {
        border-radius: 50%;
        height: 72px !important;
        width: 72px !important;
      }

      h2 {
        font-size: 1.2rem;
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
</style>