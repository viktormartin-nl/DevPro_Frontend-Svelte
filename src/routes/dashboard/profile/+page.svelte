<script>
  import svg_star from "$lib/images/svg-star.svg";
  import svg_banner from "$lib/images/svg-banner.svg";
  import svg_computer from "$lib/images/svg-computer.svg";
  import svg_change from "$lib/images/repeat-solid 1.svg";
  import svg_dolllaugh from "$lib/images/svg-dolllaugh.svg";
  import svg_createProfile from "$lib/images/svg-createProfile.svg";
  import svg_car1 from "$lib/images/svg-carousel1.svg";
  import svg_car2 from "$lib/images/svg-carousel2.svg";
  import svg_car3 from "$lib/images/svg-carousel3.svg";

  import svg_photo1 from "$lib/images/Group 63.png";
  import svg_photo2 from "$lib/images/Rectangle 47.png";
  import svg_photo3 from "$lib/images/Rectangle 94.png";
  import svg_photo4 from "$lib/images/Rectangle 97.png";
  import svg_photo5 from "$lib/images/Rectangle 98.png";
  import svg_photo6 from "$lib/images/Rectangle 99.png";

  import svg_freelancer1 from "$lib/images/check-double-solid_1.svg";
  import svg_freelancer2 from "$lib/images/money-bills-solid_1.svg";
  import svg_freelancer3 from "$lib/images/user-solid 1.svg";

  import svg_buyer1 from "$lib/images/svg-buyer1.svg";
  import svg_buyer2 from "$lib/images/svg-buyer2.svg";
  import svg_buyer3 from "$lib/images/svg-buyer3.svg";

  import svg_question from "$lib/images/svg-question.svg";
  import svg_chat from "$lib/images/svg-chat.svg";
  import svg_message from "$lib/images/svg-message.svg";
  import profile_img from "$lib/images/avatar/main.svg";
  import { Tabs, TabItem, Dropdown, Dropzone, Video } from "flowbite-svelte";

  import { Card, Img, Button, Search } from "flowbite-svelte";

  import {
    Textarea,
    Toolbar,
    ToolbarGroup,
    ToolbarButton,
  } from "flowbite-svelte";

  import {
    Avatar,
    Breadcrumb,
    BreadcrumbItem,
    Rating,
    Indicator,
  } from "flowbite-svelte";

  import { Label, Input, Checkbox } from "flowbite-svelte";

  import {
    PaperClipOutline,
    MapPinAltSolid,
    ImageOutline,
    CodeOutline,
    FaceGrinOutline,
    PapperPlaneOutline,
  } from "flowbite-svelte-icons";

  import { MicrophoneSolid, SearchOutline } from "flowbite-svelte-icons";

  import FlagFrance from "$lib/images/flag/france.png";
  import FlagBritain from "$lib/images/flag/britain.png";
  import FlagPoland from "$lib/images/flag/poland.png";
  import axios from "axios";
  import { onMount } from "svelte";
  import { BASE_URL, Role_Category } from "../../../utils/constants";
  import { isAuthenticated } from "../../../utils/auth";
  import { ToastContainer, FlatToast } from "svelte-toasts";
  import { showToast } from "../../../utils/toast";
  import profileAvatar from "$lib/images/user-solid 1.svg";

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
          skills = userProfile.skills;
          languages = userProfile.languages;
          userProfile.title = Number(userProfile.title);
          user_images = userProfile.user_images;
          user_videos = userProfile.user_videos;
        })
        .catch((error) => {
          console.log(typeof error.response.data.message);
          if (typeof error.response.data.message === "string") {
            showToast("Failed", error.response.data.message, "error");
          } else {
            showToast("Failed", error.response.data.error, "error");
          }
          location.href = "/signin";
        });
    }
  });

  let userProfile = {};

  let skills = [];
  let skillsField = "";
  let languages = [];

  let isEditable = false;

  const handleToggleEdit = () => {
    isEditable = true;
    skills = userProfile.skills;
    skillsField = skills.join(", ");
  };

  const handleCancel = () => {
    isEditable = false;
  };
  const handleSubmit = () => {
    userProfile.title = userProfile.title.toString();
    console.log("handle submit");
    console.log(userProfile);
    userProfile.skills = skillsField.split(",").map((item) => item.trim());
    axios
      .put(`${BASE_URL}/protected/update`, userProfile)
      .then((response) => {
        userProfile = response.data;
        location.href = "/dashboard/profile";
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(userProfile);
  };

  // file uploading

  let value = [];
  const dropHandle = (event) => {
    value = [];
    event.preventDefault();
    if (event.dataTransfer.items) {
      [...event.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          // formData.files.push(file);
          console.log(file);
          value.push(file.name);
          value = value;
        }
      });
    } else {
      [...event.dataTransfer.files].forEach((file, i) => {
        value = file.name;
      });
    }
  };

  const handleChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      value.push(files[0].name);
      value = value;
      // formData.files.push(files[0]);
    }
    console.log(files);
  };

  const showFiles = (files) => {
    if (files.length === 1) return files[0];
    let concat = "";
    files.map((file) => {
      concat += file;
      concat += ",";
      concat += " ";
    });

    if (concat.length > 100) concat = concat.slice(0, 100);
    concat += "...";
    return concat;
  };
  // file uploading end

  let user_images = [];

  let headers = {
    "Content-Type": "multipart/form-data",
  };

  const handleUserImageSubmit = () => {
    let formData = new FormData();
    let imageFilesInput = document.querySelector("input[id='dropzone_image']");
    // for (let i = 0; i < imageFilesInput.files.length; i++) {
    formData.append("user_images", imageFilesInput.files[0]);
    // }
    console.log(imageFilesInput.files);
    axios
      .post(`${BASE_URL}/protected/add-user-images`, formData, {
        headers,
      })
      .then((response) => {
        let data = response.data.product;
        showToast("Info", response.data.message, "info");
        setTimeout(() => {
          location.href = "/dashboard/profile";
        }, 1000);
      })
      .catch((error) => {
        console.log(error.response.status);
        showToast("Warning", error.response.data.message, "warning");
        console.log(error.response.data.message);
      });
  };

  let user_videos = [];

  const handleUserVideoSubmit = () => {
    let formData = new FormData();
    let imageFilesInput = document.querySelector("input[id='dropzone_video']");
    // for (let i = 0; i < imageFilesInput.files.length; i++) {
    formData.append("user_videos", imageFilesInput.files[0]);
    // }
    console.log(imageFilesInput.files);
    axios
      .post(`${BASE_URL}/protected/add-user-videos`, formData, {
        headers,
      })
      .then((response) => {
        let data = response.data.product;
        showToast("Info", response.data.message, "info");
        setTimeout(() => {
          location.href = "/dashboard/profile";
        }, 1000);
      })
      .catch((error) => {
        console.log(error.response.status);
        showToast("Warning", error.response.data.message, "warning");
        console.log(error.response.data.message);
      });
  };

  let deleteItem = "";

  const handleChangeDeleteItem = (item) => {
    deleteItem = item;
  };

  const handleDeleteImageSubmit = () => {
    console.log(deleteItem);
    if (deleteItem === "") {
      showToast("Warning", "Select the image you want to delete.", "warning");
    } else {
      let isAgreed = confirm("Really do you want to delete this Image?");
      if (isAgreed) {
        axios
          .post(`${BASE_URL}/protected/delete-user-images/${deleteItem}`, {
            headers,
          })
          .then((response) => {
            let data = response.data.product;
            showToast("Info", response.data.message, "info");
            deleteItem = "";
            setTimeout(() => {
              location.href = "/dashboard/profile";
            }, 1000);
          })
          .catch((error) => {
            console.log(error.response.status);
            showToast("Warning", error.response.data.message, "warning");
            console.log(error.response.data.message);
          });
      }
    }
  };

  const handleDeleteVideoSubmit = () => {
    console.log(deleteItem);
    if (deleteItem === "") {
      showToast("Warning", "Select the video you want to delete.", "warning");
    } else {
      let isAgreed = confirm("Really do you want to delete this Video?");
      if (isAgreed) {
        axios
          .post(`${BASE_URL}/protected/delete-user-videos/${deleteItem}`, {
            headers,
          })
          .then((response) => {
            let data = response.data.product;
            showToast("Info", response.data.message, "info");
            deleteItem = "";
            setTimeout(() => {
              location.href = "/dashboard/profile";
            }, 1000);
          })
          .catch((error) => {
            console.log(error.response.status);
            showToast("Warning", error.response.data.message, "warning");
            console.log(error.response.data.message);
          });
      }
    }
  };
</script>

<svelte:head>
  <title>DevPro - Dashboard - Profile</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="bg-[#363636] text-white rounded-xl">
  <div class="w-full flex justify-end px-4 {isEditable ? 'invisible' : ''} ">
    <button
      class="text-[#FF8A00] font-bold bg-[#282828] px-8 py-1 border-2 border-[#FF8A00] rounded-xl text-[24px] tracking-tight"
      on:click={handleToggleEdit}
    >
      EDIT PROFILE
    </button>
  </div>

  {#if isEditable}
    <form on:submit|preventDefault={handleSubmit}>
      <div class="w-full flex xl:flex-row md:flex-col mx-4 gap-2">
        <div
          class="lg:basis-2/5 flex flex-col text-center divide-solid divide-[#FF8A00] divide-y-[4px] px-4"
        >
          <div class="flex flex-col justify-center items-center py-2">
            {#if userProfile.profile_photo}
              <Img
                class="h-[240px] w-[240px] rounded-[50%] my-2"
                src={`${BASE_URL}/${userProfile.profile_photo}`}
                alt="Profile Photo"
              />
            {:else}
              <Img
                class="h-[240px] w-[240px] rounded-[50%] my-2"
                src={profileAvatar}
                alt="Jese picture"
              />
            {/if}
            <div class="my-4">
              <div
                class="text-[Fjalla One] font-bold text-[40px] text-[#FF8A00] tracking-tight"
              >
                {userProfile.first_name + " " + userProfile.last_name}
              </div>
              <select
                id="settings-language"
                name="countries"
                bind:value={userProfile.title}
                class="shadow-sm m-1 bg-[#282828] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-[#282828] dark:border-[#282828] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FF8A00] dark:focus:border-[#FF8A00]"
                required
              >
                {#each Role_Category as role, index}
                  <option value={index}>{role}</option>
                {/each}
              </select>
            </div>
            <div class="divide-solid divide-y-[16px]"></div>
          </div>
          <div class="py-8 px-2">
            <div class="text-[Fjalla One] font-bold text-[36px] tracking-tight">
              ABOUT ME
            </div>

            <textarea
              name="about"
              id="about"
              class="shadow-sm bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-[#282828] dark:border-[#282828] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FF8A00] dark:focus:border-[#FF8A00]"
              bind:value={userProfile.about}
              rows="5"
              required
            />
          </div>
          <div class="py-8 px-2">
            <div class="text-[Fjalla One] font-bold text-[36px] tracking-tight">
              SKILLS
            </div>

            <textarea
              name="skills"
              id="skills"
              class="shadow-sm bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-[#282828] dark:border-[#282828] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FF8A00] dark:focus:border-[#FF8A00]"
              bind:value={skillsField}
              rows="5"
              required
            />
            <div class="divide-solid divide-y-[16px]"></div>
          </div>
          <div class="py-8">
            <div class="text-[Fjalla One] font-bold text-[36px] tracking-tight">
              DETAILS
            </div>
            <div class="text-[Exo 2] text-[24px] lg:px-8 md:px-4 my-4">
              <div class="w-full grid grid-cols-2 text-left">
                <div class="m-1">WEBSITE:</div>
                <input
                  type="text"
                  name="website"
                  id="website"
                  class="shadow-sm m-1 bg-[#282828] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-[#282828] dark:border-[#282828] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FF8A00] dark:focus:border-[#FF8A00]"
                  placeholder="www.lj.com"
                  bind:value={userProfile.website_url}
                />
                <div class="m-1">PHONE:</div>
                <input
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  class="shadow-sm m-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-[#282828] dark:border-[#282828] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FF8A00] dark:focus:border-[#FF8A00]"
                  placeholder="(421)193-3494"
                  bind:value={userProfile.phone_number}
                />
                <div class="m-1">LOCATION:</div>
                <input
                  type="text"
                  name="location"
                  id="location"
                  class="shadow-sm m-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-[#282828] dark:border-[#282828] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FF8A00] dark:focus:border-[#FF8A00]"
                  placeholder="San Jose, CA"
                  bind:value={userProfile.location}
                />
                <div class="m-1">LANGUAGE:</div>
                <input
                  type="text"
                  name="languages"
                  id="language"
                  class="shadow-sm m-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-[#282828] dark:border-[#282828] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FF8A00] dark:focus:border-[#FF8A00]"
                  placeholder="EN, PO, FR"
                  bind:value={userProfile.languages[0]}
                />
              </div>
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                class="text-gray-500 font-bold px-2 py-1 mr-2 border-2 border-gray-500 rounded-xl text-[16px] tracking-tight"
                on:click={handleCancel}
              >
                CANCEL
              </button>
              <button
                type="submit"
                class="font-bold bg-[#282828] px-2 py-1 border-2 border-[#FF8A00] text-[#FF8A00] rounded-xl text-[16px] tracking-tight"
              >
                SAVE ALL
              </button>
            </div>
          </div>
        </div>

        <div class="lg:basis-3/5 flex flex-col p-4">
          <div class="border-4 border-[#FF8A00] rounded-[25px] w-full p-4">
            <div
              class="text-[Fjalla One] font-bold text-[20px] text-[#FF8A00] tracking-tight"
            >
              @{userProfile.username}
            </div>
            <Rating id="example-3" total={5} rating={4.3} class="ml-4">
              <p
                slot="text"
                class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                4.3 out of 5(132 reviews)
              </p>
            </Rating>
            <div
              class="w-full flex justify-around item-center my-8 pt-8 text-center text-[#FF8A00]"
            >
              <p class="text-2xl font-semibold justify-center flex mx-10">
                200 FOLLOWING
              </p>
              <p class="text-2xl font-semibold justify-center flex mx-10">
                3596 FOLLOWERS
              </p>
            </div>
            <div class="w-full flex justify-around items-center">
              <button
                type="button"
                class="text-[#FF8A00] font-bold bg-[#282828] px-8 py-1 border-4 border-[#FF8A00] rounded-3xl text-[32px] tracking-tight"
              >
                FOLLOW
              </button>
              <button
                type="button"
                class="text-white font-bold bg-[#FF8A00] px-8 py-1 border-4 border-[#FF8A00] rounded-3xl text-[32px] tracking-tight"
              >
                MESSAGE
              </button>
            </div>
          </div>
          <Tabs
            style="underline"
            defaultClass="flex rounded-lg  text-primary-1 shadow dark:text-primary-1 mt-4"
            activeClasses="flex rounded-lg  text-primary-1 shadow dark:text-primary-1"
            inactiveClasses="flex rounded-lg  text-primary-1 shadow dark:text-primary-1"
          >
            <TabItem open title="POSTS">
              <div class="w-full">
                <form on:submit|preventDefault={handleUserImageSubmit}>
                  <div class="flex justify-center items-center">
                    <Dropzone
                      id="dropzone_image"
                      class="w-1/3"
                      on:drop={dropHandle}
                      on:dragover={(event) => {
                        event.preventDefault();
                      }}
                      on:change={handleChange}
                      accept="image/*"
                    >
                      <svg
                        aria-hidden="true"
                        class="mb-3 w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        /></svg
                      >
                      {#if value.length === 0}
                        <p
                          class="mb-2 text-sm text-gray-500 dark:text-gray-400"
                        >
                          <span class="font-semibold">Click to upload</span> or drag
                          and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF
                        </p>
                      {:else}
                        <p class="text-gray-800">{showFiles(value)}</p>
                      {/if}
                    </Dropzone>
                  </div>
                  <div class="grid lg:grid-cols-4 md:grid-cols-2 mb-6">
                    {#each user_images as image}
                      <div
                        class="imgcontainer m-3 {image === deleteItem
                          ? 'border-2 border-[#FF8A00]'
                          : ''}"
                        on:click={() => handleChangeDeleteItem(image)}
                      >
                        <Img
                          src={`${BASE_URL}/${image}`}
                          alt="user image"
                          class="aspect-square"
                        />
                        <div class="overlay">
                          <div class="text">KingTran</div>
                        </div>
                      </div>
                    {/each}
                  </div>
                  <div class="flex justify-end">
                    <button
                      type="button"
                      class="text-gray-500 font-bold px-2 py-1 mr-2 border-2 border-gray-500 rounded-xl text-[16px] tracking-tight"
                      on:click={handleCancel}
                    >
                      CANCEL
                    </button>
                    <button
                      type="button"
                      class="text-red-500 font-bold px-2 py-1 mr-2 border-2 border-gray-500 rounded-xl text-[16px] tracking-tight"
                      on:click={handleDeleteImageSubmit}
                    >
                      Delete
                    </button>
                    <button
                      type="submit"
                      class="font-bold bg-[#282828] px-2 py-1 border-2 border-[#FF8A00] text-[#FF8A00] rounded-xl text-[16px] tracking-tight"
                    >
                      SAVE ALL
                    </button>
                  </div>
                </form>
              </div>
            </TabItem>
            <TabItem title="VIDEOS">
              <div class="w-full">
                <form on:submit|preventDefault={handleUserVideoSubmit}>
                  <div class="flex justify-center items-center">
                    <Dropzone
                      id="dropzone_video"
                      class="w-1/3"
                      on:drop={dropHandle}
                      on:dragover={(event) => {
                        event.preventDefault();
                      }}
                      on:change={handleChange}
                      accept="video/*"
                    >
                      <svg
                        aria-hidden="true"
                        class="mb-3 w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        /></svg
                      >
                      {#if value.length === 0}
                        <p
                          class="mb-2 text-sm text-gray-500 dark:text-gray-400"
                        >
                          <span class="font-semibold">Click to upload</span> or drag
                          and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          VIDEO
                        </p>
                      {:else}
                        <p class="text-gray-800">{showFiles(value)}</p>
                      {/if}
                    </Dropzone>
                  </div>
                  <div class="grid lg:grid-cols-4 md:grid-cols-2 mb-6">
                    {#each user_videos as video}
                      <div
                        class="imgcontainer m-3 {video === deleteItem
                          ? 'border-2 border-[#FF8A00]'
                          : ''} "
                        on:click={() => handleChangeDeleteItem(video)}
                      >
                        <Video
                          src={`${BASE_URL}/${video}`}
                          alt="user image"
                          class="aspect-video"
                        />
                        <div class="overlay">
                          <div class="text">KingTran</div>
                        </div>
                      </div>
                    {/each}
                  </div>
                  <div class="flex justify-end">
                    <button
                      type="button"
                      class="text-gray-500 font-bold px-2 py-1 mr-2 border-2 border-gray-500 rounded-xl text-[16px] tracking-tight"
                      on:click={handleCancel}
                    >
                      CANCEL
                    </button>
                    <button
                      type="button"
                      class="text-red-500 font-bold px-2 py-1 mr-2 border-2 border-gray-500 rounded-xl text-[16px] tracking-tight"
                      on:click={handleDeleteVideoSubmit}
                    >
                      Delete
                    </button>
                    <button
                      type="submit"
                      class="font-bold bg-[#282828] px-2 py-1 border-2 border-[#FF8A00] text-[#FF8A00] rounded-xl text-[16px] tracking-tight"
                    >
                      SAVE ALL
                    </button>
                  </div>
                </form>
              </div>
            </TabItem>
          </Tabs>
        </div>
      </div>
    </form>
  {:else}
    <div class="w-full flex xl:flex-row md:flex-col mx-4 gap-2">
      <div
        class="lg:basis-2/5 flex flex-col text-center divide-solid divide-[#FF8A00] divide-y-[4px] px-4"
      >
        <div class="flex flex-col justify-center items-center py-2">
          {#if userProfile.profile_photo}
            <Img
              class="h-[240px] w-[240px] rounded-[50%] my-2"
              src={`${BASE_URL}/${userProfile.profile_photo}`}
              alt="Profile Photo"
            />
          {:else}
            <Img
              class="h-[240px] w-[240px] rounded-[50%] my-2"
              src={profileAvatar}
              alt="Jese picture"
            />
          {/if}
          <div class="my-4">
            <div
              class="text-[Fjalla One] font-bold text-[40px] text-[#FF8A00] tracking-tight"
            >
              {userProfile.first_name + " " + userProfile.last_name}
            </div>
            {#if userProfile.title}
              <div class="text-[Exo 2] text-[24px] leading-7">
                {Role_Category[userProfile.title]}
              </div>
            {:else}
              <div
                class="text-[Exo 2] text-[24px] leading-7 h-[48px] bg-[#282828] rounded-xl"
              ></div>
            {/if}
          </div>
          <div class="divide-solid divide-y-[16px]"></div>
        </div>
        <div class="py-8">
          <div class="text-[Fjalla One] font-bold text-[36px] tracking-tight">
            ABOUT ME
          </div>
          {#if userProfile.about}
            <div class="text-[Exo 2] text-[24px] leading-7">
              {userProfile.about}
            </div>
          {:else}
            <div
              class="text-[Exo 2] text-[24px] leading-7 h-[96px] bg-[#282828] rounded-xl"
            ></div>
          {/if}
        </div>
        <div class="py-8">
          <div class="text-[Fjalla One] font-bold text-[36px] tracking-tight">
            SKILLS
          </div>
          {#if skills.length > 0}
            <div class="text-[Exo 2] text-[24px] inline">
              {#each skills as skill, index}
                <div
                  class="border-2 border-white text-[Fjalla One] text-[16px] font-bold rounded-[8px] px-2 py-0.5 mx-1 tracking-tight inline-block"
                  id={index.toString()}
                >
                  {skill}
                </div>
              {/each}
            </div>
          {:else}
            <div
              class="text-[Exo 2] text-[24px] leading-7 h-[96px] bg-[#282828] rounded-xl"
            ></div>
          {/if}
          <div class="divide-solid divide-y-[16px]"></div>
        </div>
        <div class="py-8">
          <div class="text-[Fjalla One] font-bold text-[36px] tracking-tight">
            DETAILS
          </div>
          <div class="text-[Fjalla One] text-[24px] px-4">
            <div class="w-full grid grid-cols-2 text-left">
              <div class="m-1">WEBSITE:</div>
              <div class="m-1">
                {#if userProfile.website_url}
                  <div class="text-[Exo 2] text-[24px] leading-7">
                    {userProfile.website_url}
                  </div>
                {:else}
                  <div
                    class="text-[Exo 2] text-[24px] leading-7 h-[42px] bg-[#282828] rounded-xl"
                  ></div>
                {/if}
              </div>
              <div class="m-1">PHONE:</div>
              <div class="m-1">
                {#if userProfile.phone_number}
                  <div class="text-[Exo 2] text-[24px] leading-7">
                    {userProfile.phone_number}
                  </div>
                {:else}
                  <div
                    class="text-[Exo 2] text-[24px] leading-7 h-[42px] bg-[#282828] rounded-xl"
                  ></div>
                {/if}
              </div>
              <div class="m-1">LOCATION:</div>
              <div class="m-1">
                {#if userProfile.location}
                  <div class="text-[Exo 2] text-[24px] leading-7">
                    {userProfile.location}
                  </div>
                {:else}
                  <div
                    class="text-[Exo 2] text-[24px] leading-7 h-[42px] bg-[#282828] rounded-xl"
                  ></div>
                {/if}
              </div>
              <div class="m-1">LANGUAGE:</div>
              <div class="flex flex-row gap-4 items-center">
                {#if languages.length > 0}
                  <div class="text-[Exo 2] text-[24px] leading-7">
                    {languages[0]}
                  </div>
                {/if}
                <!-- <Img src={FlagFrance} class="w-[36px] h-[24px]" />
                <Img src={FlagBritain} class="w-[36px] h-[24px]" />
                <Img src={FlagPoland} class="w-[36px] h-[24px]" /> -->
              </div>
            </div>
          </div>
          <div class="divide-solid divide-y-[16px]"></div>
        </div>
      </div>

      <div class="lg:basis-3/5 flex flex-col p-4">
        <div class="border-4 border-[#FF8A00] rounded-[25px] w-full p-4">
          <div
            class="text-[Fjalla One] font-bold text-[20px] text-[#FF8A00] tracking-tight"
          >
            @{userProfile.username}
          </div>
          <Rating id="example-3" total={5} rating={4.3} class="ml-4">
            <p
              slot="text"
              class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              4.3 out of 5(132 reviews)
            </p>
          </Rating>
          <div
            class="w-full flex justify-around item-center my-8 pt-8 text-center text-[#FF8A00]"
          >
            <p class="text-2xl font-semibold justify-center flex mx-10">
              200 FOLLOWING
            </p>
            <p class="text-2xl font-semibold justify-center flex mx-10">
              3596 FOLLOWERS
            </p>
          </div>
          <div class="w-full flex justify-around items-center">
            <button
              class="text-[#FF8A00] font-bold bg-[#282828] px-8 py-1 border-4 border-[#FF8A00] rounded-3xl text-[32px] tracking-tight"
            >
              FOLLOW
            </button>
            <button
              class="text-white font-bold bg-[#FF8A00] px-8 py-1 border-4 border-[#FF8A00] rounded-3xl text-[32px] tracking-tight"
            >
              MESSAGE
            </button>
          </div>
        </div>
        <Tabs
          style="underline"
          defaultClass="flex rounded-lg  text-primary-1 shadow dark:text-primary-1 mt-4"
          activeClasses="flex rounded-lg  text-primary-1 shadow dark:text-primary-1"
          inactiveClasses="flex rounded-lg  text-primary-1 shadow dark:text-primary-1"
        >
          <TabItem open title="POSTS">
            <div class="grid lg:grid-cols-4 md:grid-cols-2 mb-6">
              {#each user_images as image}
                <div class="imgcontainer m-3">
                  <Img
                    src={`${BASE_URL}/${image}`}
                    alt="user image"
                    class="aspect-square"
                  />
                  <div class="overlay">
                    <div class="text">KingTran</div>
                  </div>
                </div>
              {/each}
            </div>
          </TabItem>
          <TabItem title="VIDEOS">
            <div class="grid lg:grid-cols-4 md:grid-cols-2 mb-6">
              {#each user_videos as video}
                <div class="imgcontainer m-3">
                  <Video
                    src={`${BASE_URL}/${video}`}
                    alt="user image"
                    class="aspect-video"
                  />
                  <div class="overlay">
                    <div class="text">KingTran</div>
                  </div>
                </div>
              {/each}
            </div>
          </TabItem>
        </Tabs>
      </div>
    </div>
  {/if}

  <ToastContainer let:data>
    <FlatToast {data} />
  </ToastContainer>
</section>

<style>
  section {
    align-items: center;
    max-width: 84rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;

    margin: 0 auto;
    box-sizing: border-box;
    margin-top: 5rem;
  }

  .imgcontainer {
    position: relative;
    /* width: 50%; */
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    /* background-color: #008cba; */
    background: rgba(0, 0, 0, 0.7); /* Black see-through */
    color: #f1f1f1;
    overflow: hidden;
    width: 100%;
    height: 0;
    transition: 0.5s ease;
  }

  .imgcontainer:hover .overlay {
    height: 100%;
  }

  .text {
    color: white;
    font-size: 30px;
    position: absolute;
    top: 30%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .text2 {
    color: white;
    font-size: 16px;
    position: relative;
    padding: 1.5rem;
    top: 60%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>
