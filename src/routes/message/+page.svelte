<script>
  import { ButtonGroup, Search } from "flowbite-svelte";
  import avatar1 from "$lib/images/img1.jpg";
  import avatar2 from "$lib/images/Group 63.png";
  import avatar3 from "$lib/images/Rectangle 47.png";
  import avatar4 from "$lib/images/Rectangle 94.png";
  import avatar5 from "$lib/images/Rectangle 97.png";
  import avatar6 from "$lib/images/Rectangle 98.png";
  import avatar7 from "$lib/images/Rectangle 99.png";
  import downArrow from "$lib/images/Vector.svg";
  import directCurious from "$lib/images/Ellipse 31.png";
  import phonesolid from "$lib/images/phone-solid 1.svg";
  import videosolid from "$lib/images/video-solid 1.svg";
  import groupsolid from "$lib/images/Group 74.svg";
  import paperclip from "$lib/images/paperclip-solid 1.png";
  import microphone from "$lib/images/microphone-solid 1.png";
  import facegrin from "$lib/images/face-grin-stars-solid 1.png";
  import chevronRight from "$lib/images/chevron-right-solid 2.png";
  import { ChevronDownSolid } from "flowbite-svelte-icons";
  import { Dropdown, DropdownItem, DropdownDivider } from "flowbite-svelte";

  import Suggestions from "../suggestions/+page.svelte";
  import OrderDetails from "../orderdetails/+page.svelte";
  import CuriousGeorge from "../curiousGeorge/+page.svelte";

  let items = [
    {
      avatar: avatar1,
      name: "curiousgeorge",
      lastMessage: "",
    },
    {
      avatar: avatar2,
      name: "maxvers",
      lastMessage: "yo. whats up",
    },
    {
      avatar: avatar3,
      name: "timothee_chal",
      lastMessage: "yo. whats up",
    },
    {
      avatar: avatar4,
      name: "porsheusa",
      lastMessage: "yo. whats up",
    },
    {
      avatar: avatar5,
      name: "charlesleclerc",
      lastMessage: "yo. whats up",
    },
    {
      avatar: avatar6,
      name: "goerge.russell",
      lastMessage: "yo. whats up",
    },
    {
      avatar: avatar7,
      name: "lewishamilton",
      lastMessage: "yo. whats up",
    },
    {
      avatar: avatar1,
      name: "curiousgeorge",
      lastMessage: "",
    },
    {
      avatar: avatar2,
      name: "maxvers",
      lastMessage: "yo. whats up",
    },
    {
      avatar: avatar3,
      name: "timothee_chal",
      lastMessage: "yo. whats up",
    },
    {
      avatar: avatar4,
      name: "porsheusa",
      lastMessage: "yo. whats up",
    },
  ];
  import { afterUpdate, onMount } from "svelte";
  import Button from "../../components/Button.svelte";
  import Container from "../../components/Container.svelte";
  import Logo from "../../components/Logo.svelte";
  import Message from "../../components/Message.svelte";
  import People from "../../components/People.svelte";
  import Toggler from "../../components/Toggler.svelte";
  import { ID_KEY, BASE_URL } from "../../utils/constants";
  import { isAuthenticated } from "../../utils/auth";
  import { toDataUrl } from "../../utils/message";
  import { socket, joinRoom } from "../../store";
  import FileInput from "../../components/FileInput.svelte";
  import { writable } from "svelte/store";
  import axios from "axios";
  import { ToastContainer, FlatToast } from "svelte-toasts";
  import { showToast } from "../../utils/toast";

  onMount(() => {
    if (!isAuthenticated()) {
      location.href = "/signin";
      showToast("Failed", "User not Found", "error");
    } else {
      axios
        .get(`${BASE_URL}/protected`)
        .then((response) => {
          userProfile = response.data;
          console.log(userProfile);
          joinRoom(userProfile);
          fetchUserData();
        })
        .catch((error) => {
          console.log(error);
          // if (typeof error.response.data.message === "string") {
          //   showToast("Failed", error.response.data.message, "error");
          // } else {
          //   showToast("Failed", error.response.data.error, "error");
          // }
          // location.href = "/signin";
        });
    }
  });

  let userProfile = {};

  let users = writable([]);
  let activeFriend = {
    email: "no one",
    id: "",
  };
  // const {
  //   email: username,
  //   id,
  //   token,
  // } = JSON.parse(localStorage.getItem(ID_KEY));
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
    console.log("sdf");
    socket.emit("joinRoom", userProfile._id);

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
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Example: Include an access token
      };

      const requestOptions = {
        method: "GET", // Change the HTTP method if needed
        headers: headers,
      };

      // Fetch messages data with headers included
      const response = await fetch(
        `http://localhost:3000/protected/history/${userProfile._id}/${friendId}/1`,
        requestOptions
      );
      const messagesData = await response.json();
      console.log(messagesData, "...");
      messages = sortByTimestamp(messagesData.data);
      console.log(messages);
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
      sender: userProfile._id,
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

<svelte:head>
  <title>Message</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<svelte:window on:keydown={handleEnter} />
<div class="mx-32 my-20">
  <h1 class="text-left mb-4">CHATS</h1>
  <div class="flex bg-primary-4 rounded-2xl">
    <div class="w-1/4 min-h-[1300px] m-3">
      <!-- address -->
      <div
        class="bg-primary-0 rounded-2xl mb-3 min-h-[900px] px-4 py-3 flex flex-col cursor-pointer"
      >
        <div
          class="flex text-center border border-1 text-white border-primary-1 p-[2px] rounded-2xl mb-[14px]"
        >
          <div class="w-1/2 bg-primary-1 py-2 rounded-l-2xl">MAIN</div>
          <div class="w-1/2 py-2">GROUPS</div>
        </div>

        <Search size="sm" class="rounded-2xl" placeholder=""></Search>

        <div>
          {#each $users as { profile_photo, email, _id, isSelf } (_id)}
            <div
              on:click={() => {
                handleActiveFriend(email, _id);
              }}
              class="border-2 py-2 px-4 bg-opacity-25 my-[14px] rounded-xl flex items-center h-[51px] bg-primary-1 border-primary-1"
            >
              {#if profile_photo}
                <img
                  src={`${BASE_URL}/${profile_photo}`}
                  alt=""
                  class="w-[35px] h-[35px] rounded-full mr-2"
                />
              {:else}
                <div class="w-[35px] h-[35px] rounded-full mr-2 bg-white"></div>
              {/if}
              <!-- {#if item.lastMessage}
                <div>
                  <p>{item.name}</p>
                  <p class="reading-[13px] text-[13px]">{item.lastMessage}</p>
                </div>
              {:else} -->
              {email}
              <!-- {/if} -->
            </div>
          {/each}
          <div class="flex justify-center mt-8">
            <img src={downArrow} alt="" />
          </div>
        </div>
      </div>
      <!-- detail -->
      <div class="bg-primary-0 rounded-2xl min-h-[388px]">
        <CuriousGeorge />
      </div>
    </div>

    <!-- chat board -->
    <div
      class="w-1/2 min-h-[1300px] bg-primary-0 rounded-2xl my-3"
      style="padding: 13px 26px;"
    >
      <div
        class="direct-curious"
        style="display: flex; justify-content: space-between;"
      >
        <div style="display: flex; height: 76px;">
          {#if userProfile.profile_photo}
            <img
              src={`${BASE_URL}/${userProfile.profile_photo}`}
              alt="direct"
              class="aspect-square mr-4 rounded-[50%]"
            />
          {:else}
            <div class="mr-4 aspect-square rounded-[50%] bg-white"></div>
          {/if}
          <div>
            <h4 style="color: #FF8A00; font-size: 25px;">
              {userProfile.username}
            </h4>
            <p style="color: #FF8A00; font-size: 10px;">
              Last active 2 minutes ago
            </p>
          </div>
        </div>
        <div
          style="padding: 13px 26px; display: flex; align-items: center; gap: 22px;"
        >
          <img src={phonesolid} alt="phone" />
          <img src={videosolid} alt="video" />
          <div>
            <img
              src={groupsolid}
              alt="group"
              style="margin-top: 10px;"
            /><ChevronDownSolid
              class="w-3 h-3 ms-2 text-primary-0 dark:text-white"
            />
          </div>
          <Dropdown>
            <DropdownItem class="font-bold">SHARE PROFILE</DropdownItem>
            <DropdownItem class="font-bold">REPORT</DropdownItem>
            <DropdownItem class="text-primary-6 font-bold"
              >BLOCK USER</DropdownItem
            >
          </Dropdown>
        </div>
      </div>
      <div
        class="chat-part"
        style="display: flex; flex-direction: column-reverse; justify-content: flex-start; height: calc(100% - 76px); padding-bottom: 20px;"
      >
        <form
          on:submit|preventDefault={handleMessage}
          id="chat-input"
          style="display: flex; justify-content: space-between; gap: 8px;"
        >
          <div
            style="width: 100%; display: inline-flex; padding-top: 2px; padding-bottom: 2px; padding-left: 14px; padding-right: 14px; align-items: center; border-radius: 12px; background: #D9D9D9; justify-content: space-between;"
          >
            <input
              bind:value={messageValue}
              on:keydown={(e) => e.key === "Enter" && e.preventDefault()}
              autocomplete="off"
              type="text"
              name="message"
              class="w-full"
              style="background: #D9D9D9; color: #282828; font-size: 20px; font-style: normal; font-weight: 400; line-height: 111%; letter-spacing: -0.2px; border: none;"
              placeholder="Type here..."
            />
            <div style="display: flex;">
              <img src={facegrin} alt="face" style="padding-right: 10px;" />
              <img
                src={microphone}
                alt="microphone"
                style="padding-right: 10px;"
              />
              <img src={paperclip} alt="papaer" style="padding-right: 10px;" />
            </div>
          </div>
          <Button
            type="submit"
            value=">"
            disabled={isSending}
            bind:ref={sendButton}
            style="color: white; width: 64px; flex-shrink: 0; border-radius: 10px; background: #FF8A00; font-size: 16px;"
            >{">"}</Button
          >
        </form>
        <!-- <form
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
        </form> -->
        <div style="padding-top: 27px; padding-bottom: 27px;">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="69"
            height="21"
            viewBox="0 0 69 21"
            fill="none"
          >
            <circle cx="10.0161" cy="10.0161" r="10.0161" fill="white" />
            <circle
              cx="34.4995"
              cy="10.0161"
              r="10.0161"
              fill="white"
              fill-opacity="0.5"
            />
            <circle
              cx="58.9839"
              cy="10.0161"
              r="10.0161"
              fill="white"
              fill-opacity="0.5"
            />
          </svg>
        </div>
        <div
          id="chatting"
          class="flex flex-col flex-auto flex-shrink-0 overflow-x-auto smoo h-screen"
          bind:this={chatMessages}
          style="flex-directoin: column!important"
        >
          <!-- <div class="chat-send">
            <div class="chat-segment"><span>I found your papers!</span></div>
            <div class="chat-segment"><span>Hey</span></div>
          </div>
          <div class="chat-receive">
            <div class="chat-segment"><span>do you have my papers?</span></div>
          </div> -->
          <!-- <div
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
          </div> -->
          {#each messages as { _id, room, ...rest }, index (index)}
            <Message {...rest} />
          {/each}
        </div>
        <p
          class="text-center"
          style="margin-bottom: 27px; color: rgba(255, 255, 255, 0.70); font-size: 10px; font-weight: 400; line-height: normal; letter-spacing: -0.1px;"
        >
          SATURDAY - MARCH 6, 2021 AT 4:59PM
        </p>
      </div>
    </div>

    <div class="w-1/4 min-h-[1300px] m-3">
      <!-- order -->
      <div class="bg-primary-0 rounded-2xl mb-3 min-h-[650px]">
        <OrderDetails />
      </div>
      <!-- suggestion -->
      <div class="bg-primary-0 rounded-2xl min-h-[638px]">
        <Suggestions />
      </div>
    </div>
  </div>

  <ToastContainer let:data>
    <FlatToast {data} />
  </ToastContainer>
</div>

<style>
  .chat-segment span {
    font-size: 20px;
    color: white;
    padding: 12px;
  }
  .chat-send .chat-segment {
    padding: 12px 4px 0px 14px;
  }
  .chat-send .chat-segment span {
    display: inline-flex;
    float: right;
    justify-content: flex-end;
    align-items: center;
    border-radius: 12px 0px 12px 12px;
    background: #ff8a00;
  }
  .chat-receive .chat-segment {
    padding: 11px 11px 0px 5px;
  }
  .chat-receive .chat-segment span {
    display: inline-flex;
    float: left;
    align-items: center;
    border-radius: 12px 0px 12px 12px;
    background: #373737;
  }
  #chatting,
  #chatting > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 20px;
  }
</style>
