<script lang="ts">
  import { onMount } from 'svelte';
  import PartySocket from 'partysocket';
  import { encryptMessage, decryptMessage } from '$lib/crypto';

  let messages = $state([]);
  let message = $state('');
  let socket;

  onMount(() => {
    socket = new PartySocket({
      host: 'localhost:1999',
      room: 'my-room',
    });

    socket.onmessage = async (event) => {
      const decryptedMessage = await decryptMessage(event.data);
      messages = [...messages, decryptedMessage];
    };

    return () => {
      socket.close();
    };
  });

  async function sendMessage() {
    const encryptedMessage = await encryptMessage(message);
    socket.send(encryptedMessage);
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