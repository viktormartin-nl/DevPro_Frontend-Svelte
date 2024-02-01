<script>
  import { afterUpdate, onMount } from "svelte";
  import Button from "./Button.svelte";
  import Container from "./Container.svelte";
  import Logo from "./Logo.svelte";
  import Message from "./Message.svelte";
  import People from "./People.svelte";
  import Toggler from "./Toggler.svelte";
  import { ID_KEY } from "../const";
  import { toDataUrl } from "../utils";
  import { socket, loggedUser } from "../store";
  import FileInput from "./FileInput.svelte";
  import { writable } from "svelte/store";

  let users = writable([]);
  let activeFriend = {
    email: "no one",
    id: "",
  };
  const {
    email: username,
    id,
    token,
  } = JSON.parse(localStorage.getItem(ID_KEY));
  const room = "122";
  let messageValue = "";
  let messages = [];
  let chatMessages;
  let isOpen;
  let fileValue;
  let sendButton;
  let isSending = true;

  function sortByTimestamp(arrayOfObjects) {
    // Sort the array based on the timestamp property
    arrayOfObjects.sort(
      (a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp)
    );

    // Return the sorted array
    return arrayOfObjects;
  }

  const fetchUserData = async () => {
    socket.emit("joinRoom", id);

    try {
      const response = await fetch("http://localhost:3000/protected/all-user");
      const data = await response.json();

      // Update the users store with the fetched data
      users.set(data);
      console.log(data);
      // Set the loggedUser store with the logged-in user data
      // loggedUser.set(data.loggedUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  onMount(() => {
    fetchUserData();
  });
  socket.on("receiveMessage", (message) => {
    console.log(message, "receiveMessage", activeFriend.id, message.sender);
    // setMessageList((prev)=>[...prev,message])
    if (activeFriend.id === message.sender) {
      messages = sortByTimestamp([...messages, message]);
    }
  });
  const handleActiveFriend = async (email, friendId) => {
    if (isSending) {
      isSending = false;
    }
    activeFriend.email = email;
    activeFriend.id = friendId;

    try {
      const headers = {
        "Content-Type": "application/json",
        // Add any other headers you need
        Authorization: `Bearer ${token}`, // Example: Include an access token
      };

      const requestOptions = {
        method: "GET", // Change the HTTP method if needed
        headers: headers,
      };

      // Fetch messages data with headers included
      const response = await fetch(
        `http://localhost:3000/protected/history/${id}/${friendId}/1`,
        requestOptions
      );
      const messagesData = await response.json();
      console.log(messagesData, "...");
      messages = sortByTimestamp(messagesData.data);
      // Set the loggedUser store with the logged-in user data
      // loggedUser.set(data.loggedUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  async function handleMessage(e) {
    // const file = fileValue.files[0] || null
    if (e.target.tagName === "FORM" && !messageValue) return;

    isSending = true;

    const time = new Date();
    const data = {
      sender: id,
      recipient: activeFriend.id,
      content: messageValue,
      timestamp: time,
    };

    // Emit the message to the specific room of the recipient
    socket.emit("sendMessage", data);

    messages = [
      ...messages,
      {
        ...data,
        _id: Math.random().toString().concat(new Date().getTime().toString()),
      },
    ];
    messageValue = "";
    isSending = false;
  }
  function handleLeave() {
    localStorage.removeItem(ID_KEY);
    window.location.reload();
  }
  function handleClear() {
    messages = [];
  }
  afterUpdate(() => {
    if (!chatMessages) return;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatMessages.focus();
  });
  socket.on("server-message", (data) => {
    messages = [...messages, data];
  });

  function handleEnter(e) {
    if (e.key === "Enter") sendButton.click();
  }
</script>

<svelte:window on:keydown={handleEnter} />
<div
  class="flex md:flex-row flex-col h-full w-full overflow-x-hidden
  bg-transparent"
>
  <!-- Side Bar -->
  <Toggler on:click={() => (isOpen = !isOpen)} />
  <div
    class:-translate-x-full={!isOpen}
    class={`flex-col py-8 px-3 md:w-64 w-2/4 bg-white flex-shrink-0
    overflow-auto fixed md:static top-0 h-screen z-50 transform duration-150 md:transform-none`}
  >
    <Logo />

    <div class="text-md mt-5">
      <span class="font-bold">Name:</span>
      {username}
    </div>
    <div class="text-md mt-5">
      <span class="font-bold">chat with:</span>
      {activeFriend.email}
    </div>
    <div class="flex flex-col mt-8">
      <div class="flex flex-row items-center justify-between text-xs">
        <span class="font-bold">Active Conversations</span>
      </div>
      <div class="flex flex-col space-y-1 -mx-2 h-50 mb-2 overflow-y-auto">
        {#each $users as { email, _id, isSelf } (_id)}
          <span
            on:click={() => {
              handleActiveFriend(email, _id);
            }}
          >
            <People name={email} {isSelf} /></span
          >
        {/each}
      </div>
    </div>
    <Button class="w-full" on:click={handleLeave} danger>Leave Room</Button>
    <!-- <Button class="w-full" on:click={handleClear}>Clear Chat</Button> -->
  </div>
  <!-- SideBarEnd -->

  <!-- ChatMessages -->
  <Container class="flex flex-col flex-auto h-full p-2 bg-gray-200">
    <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full p-4">
      <div
        bind:this={chatMessages}
        class="flex flex-col h-full overflow-x-auto mb-4 smoo"
      >
        <div class="flex flex-col h-full">
          <div class="flex flex-col">
            {#each messages as { _id, room, ...rest }, index (index)}
              <Message {...rest} />
            {/each}
          </div>
        </div>
      </div>

      <form
        on:submit|preventDefault={handleMessage}
        class="flex items-center justify-center"
      >
        <div class="w-full relative">
          <textarea
            bind:value={messageValue}
            on:keydown={(e) => e.key === "Enter" && e.preventDefault()}
            autocomplete="off"
            class="w-full h-12 shadow-md block py-2 px-1 pr-8 mt-2 text-gray-800
            appearance-none border-b-2 border-gray-200 focus:text-gray-500
            focus:outline-none focus:border-gray-200 resize-none rounded-md"
            name="message"
          />
        </div>

        <Button disabled={isSending} bind:ref={sendButton} class=" ml-2">
          Send
          <svg
            slot="icon"
            class="w-4 h-4 transform rotate-90 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </Button>
      </form>
    </div>
  </Container>
  <!-- CHat Messages End -->
</div>
