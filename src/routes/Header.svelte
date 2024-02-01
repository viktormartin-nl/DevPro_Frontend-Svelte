<script>
  import { onMount } from "svelte";

  import axios from "axios";
  import { BASE_URL } from "../utils/constants";

  import { isAuthenticated } from "../utils/auth";
  import { page } from "$app/stores";

  let auth = false;

  import logo from "$lib/images/svelte-logo.svg";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
  } from "flowbite-svelte";

  import { Img, Button, Search } from "flowbite-svelte";
  import { MicrophoneSolid, SearchOutline } from "flowbite-svelte-icons";
  import { searchDeveloper } from "../utils/developer";
  onMount(() => {
    if (isAuthenticated()) {
      axios
        .get(`${BASE_URL}/protected`)
        .then((response) => {
          userProfile = response.data;
          auth = true;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  let userProfile = {};

  let searchText = "";

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchDeveloper(searchText);
    }
  };
</script>

<header>
  <div class="relative px-8">
    <Navbar
      class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b bg-primary-0  font-semibold text-primary-1	"
    >
      <NavBrand href="/">
        <img src={logo} class="mr-3 h-8 sm:h-12" alt="Dev pro Logo" />

        <span
          class="self-center whitespace-nowrap text-3xl font-semibold dark:text-white text-primary-1"
          >DEVPRO</span
        >
      </NavBrand>
      <NavHamburger />
      <NavUl>
        <NavLi
          class="text-primary-1 text-lg font-medium"
          href="/dashboard"
          active={true}
        >
          Become a Freelancer
        </NavLi>
        {#if auth}
          <NavLi
            class="text-primary-1 text-lg font-medium border-solid border-2 border-sky-500"
            href="/message"
          >
            Message
            <!-- <span
              class="inline-flex items-center justify-center -ml-2 w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
            >
              3
            </span> -->
          </NavLi>
        {/if}
        <NavLi class="text-primary-1 text-lg font-medium " href="/about">
          About
        </NavLi>
        {#if !auth}
          <NavLi class="text-primary-1 text-lg font-medium" href="/signin">
            Sign In
          </NavLi>
          <NavLi
            class="text-primary-1 text-lg font-medium border-solid border-2 border-sky-500"
            href="/signup"
          >
            Sing Up
          </NavLi>
        {:else}
          <form class="flex gap-2">
            <Search
              size="md"
              class="flex gap-2 items-center"
              placeholder="Search Freelancers.."
              on:keypress={handleKeyPress}
              bind:value={searchText}
            />
          </form>
        {/if}
      </NavUl>
    </Navbar>
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
  }
</style>
