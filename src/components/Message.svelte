<script>
  import { fade } from "svelte/transition";
  import calert from "calerts";
  import { ID_KEY } from "../utils/constants";
  export let username = "";
  export let content = "";
  export let image = "";
  export let timestamp = "";
  export let recipient = "";
  export let sender = "";
  export let imageName = "";
  async function handleModal() {
    const res = await calert({
      image: {
        src: image,
        alt: "sent image by user",
      },
      confirmButton: "Download",
      cancelButton: "Cancel",
    });
    if (res.isConfirmed) {
      calert.utils
        .tag("a", { href: image, download: imageName || "image.png" })
        .click();
    }
  }
  const { id } = JSON.parse(localStorage.getItem(ID_KEY));

  let isSelf = id === sender;
  const class2 = isSelf ? "justify-start flex-row-reverse" : "flex-row";
</script>

<div in:fade class={`rounded-lg max-w-full mb-2`}>
  <div class={`flex items-center ${class2}`}>
    <!-- <div
      class="flex items-center justify-center h-10 w-10 rounded-full
      bg-indigo-500 flex-shrink-0"
    >
      {username.substr(0, 1).toUpperCase()}
    </div> -->
    <div
      style="word-break:break-word;"
      class="relative text-sm shadow rounded-xl max-w-full {isSelf
        ? 'chat-send'
        : 'chat-receive'}"
    >
      <div class="chat-segment">
        <span>
          {content}
        </span>
      </div>
      <!-- <div class="flex">
        <span class="font-bold text-blue-600 mr-2">{username}</span>
        <span class="text-blue-500 mr-2 text-xs"
          >{new Date(timestamp).toLocaleTimeString() +
            " " +
            new Date(timestamp).toLocaleDateString()}</span
        >
      </div> -->
      <!-- {#if image}
        <img
          src={image}
          on:click={handleModal}
          class="max-w-full max-h-60 cursor-pointer"
          alt={`sent by ${username}`}
        />
      {/if} -->
    </div>
  </div>
</div>

<style>
  .chat-segment span {
    font-size: 20px;
    color: white;
    padding: 12px;
  }
  /* .chat-send .chat-segment {
    padding: 12px 4px 0px 14px;
  } */
  .chat-send .chat-segment span {
    display: inline-flex;
    float: right;
    justify-content: flex-end;
    align-items: center;
    border-radius: 12px 0px 12px 12px;
    background: #ff8a00;
  }
  /* .chat-receive .chat-segment {
    padding: 11px 11px 0px 5px;
  } */
  .chat-receive .chat-segment span {
    display: inline-flex;
    float: left;
    align-items: center;
    border-radius: 0px 12px 12px 12px;
    background: #373737;
  }
  .chatting-child {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    padding-bottom: 20px;
  }
</style>
