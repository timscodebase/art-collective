
<script lang="ts">
  import { onMount } from 'svelte';
  import PartySocket from 'partysocket';

  let messages = $state([]);
  let message = $state('');
  let socket;

  onMount(() => {
    socket = new PartySocket({
      host: 'localhost:1999',
      room: 'my-room',
    });

    socket.onmessage = (event) => {
      messages = [...messages, event.data];
    };

    return () => {
      socket.close();
    };
  });

  function sendMessage() {
    socket.send(message);
    message = '';
  }
</script>

<h1>Chat</h1>

<form onsubmit="{sendMessage}">
  <input type="text" bind:value="{message}" />
  <button type="submit">Send</button>
</form>

<ul>
  {#each messages as msg}
    <li>{msg}</li>
  {/each}
</ul>
