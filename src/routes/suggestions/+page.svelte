<script>
  import { Listgroup, Avatar, Button } from "flowbite-svelte";
  import Ellipse1 from "$lib/images/suggestions/Ellipse 30 (1).png";
  import Ellipse2 from "$lib/images/suggestions/Ellipse 30 (2).png";
  import Ellipse3 from "$lib/images/suggestions/Ellipse 30 (3).png";
  import Ellipse4 from "$lib/images/suggestions/Ellipse 30 (4).png";
  import Ellipse5 from "$lib/images/suggestions/Ellipse 30 (5).png";
  import Ellipse6 from "$lib/images/suggestions/Ellipse 30 (6).png";
  import Ellipse7 from "$lib/images/suggestions/Ellipse 30 (7).png";
  import Ellipse8 from "$lib/images/suggestions/Ellipse 30 (8).png";
  import Ellipse9 from "$lib/images/suggestions/Ellipse 30 (9).png";

  const contacts = [
    {
      name: "lewis44ham",
      role: "Figma Developer",
    },
    {
      name: "fortyfourham",
      role: "UI/UX Artist",
    },
    {
      name: "design4fun",
      role: "SFX & VFX",
    },
    {
      name: "quicktoday",
      role: "Photoshop Artist",
    },
    {
      name: "polapia",
      role: "Photoshop Artist",
    },
    {
      name: "itsraceday",
      role: "Figma Developer",
    },
    {
      name: "gmronnl2",
      role: "Blender Developer",
    },
    {
      name: "mrpresident",
      role: "Photshop & DaVinci Resolve Editor",
    },
    {
      name: "realism",
      role: "Unreal Engine Developer",
    },
  ];
</script>

<Listgroup active class="w-100% border-none" style="background: #282828;">
  <h3
    class="p-3 text-xl font-medium text-gray-900"
    style="color: #FF8A00; font-size: 25px;"
  >
    Suggestions
  </h3>
  <div
    class="flex justify-end my-2 mx-4 items-center text-base font-semibold gap-2 border-none justify-between"
  >
    <Avatar
      src={Ellipse1}
      size="xs"
      style="width: 44px; height: 44px; margin-right: 4px;"
    />
    <div style="margin-right: 30px;">
      <h5 style="font-size: 15px; color: white;">{contacts[0].name}</h5>
      <p style="font-size: 10px; color: white; opacity: 60%;">
        {contacts[0].role}
      </p>
    </div>
    <Button style="padding: 2px 8px;" class="bg-primary-1">Add</Button>
  </div>
  <div
    class="flex justify-end my-2 mx-4 items-center text-base font-semibold gap-2 border-none justify-between"
  >
    <Avatar
      src={Ellipse2}
      size="xs"
      style="width: 44px; height: 44px; margin-right: 4px;"
    />
    <div style="margin-right: 30px;">
      <h5 style="font-size: 15px; color: white;">{contacts[1].name}</h5>
      <p style="font-size: 10px; color: white; opacity: 60%;">
        {contacts[1].role}
      </p>
    </div>
    <Button style="padding: 2px 8px;" class="bg-primary-1">Add</Button>
  </div>
  <div
    class="flex justify-end my-2 mx-4 items-center text-base font-semibold gap-2 border-none justify-between"
  >
    <Avatar
      src={Ellipse3}
      size="xs"
      style="width: 44px; height: 44px; margin-right: 4px;"
    />
    <div style="margin-right: 30px;">
      <h5 style="font-size: 15px; color: white;">{contacts[2].name}</h5>
      <p style="font-size: 10px; color: white; opacity: 60%;">
        {contacts[2].role}
      </p>
    </div>
    <Button style="padding: 2px 8px;" class="bg-primary-1">Add</Button>
  </div>
  <div
    class="flex justify-end my-2 mx-4 items-center text-base font-semibold gap-2 border-none justify-between"
  >
    <Avatar
      src={Ellipse4}
      size="xs"
      style="width: 44px; height: 44px; margin-right: 4px;"
    />
    <div style="margin-right: 30px;">
      <h5 style="font-size: 15px; color: white;">{contacts[3].name}</h5>
      <p style="font-size: 10px; color: white; opacity: 60%;">
        {contacts[3].role}
      </p>
    </div>
    <Button style="padding: 2px 8px;" class="bg-primary-1">Add</Button>
  </div>
  <div
    class="flex justify-end my-2 mx-4 items-center text-base font-semibold gap-2 border-none justify-between"
  >
    <Avatar
      src={Ellipse5}
      size="xs"
      style="width: 44px; height: 44px; margin-right: 4px;"
    />
    <div style="margin-right: 30px;">
      <h5 style="font-size: 15px; color: white;">{contacts[4].name}</h5>
      <p style="font-size: 10px; color: white; opacity: 60%;">
        {contacts[4].role}
      </p>
    </div>
    <Button style="padding: 2px 8px;" class="bg-primary-1">Add</Button>
  </div>
  <div
    class="flex justify-end my-2 mx-4 items-center text-base font-semibold gap-2 border-none justify-between"
  >
    <Avatar
      src={Ellipse6}
      size="xs"
      style="width: 44px; height: 44px; margin-right: 4px;"
    />
    <div style="margin-right: 30px;">
      <h5 style="font-size: 15px; color: white;">{contacts[5].name}</h5>
      <p style="font-size: 10px; color: white; opacity: 60%;">
        {contacts[5].role}
      </p>
    </div>
    <Button style="padding: 2px 8px;" class="bg-primary-1">Add</Button>
  </div>
  <div
    class="flex justify-end my-2 mx-4 items-center text-base font-semibold gap-2 border-none justify-between"
  >
    <Avatar
      src={Ellipse7}
      size="xs"
      style="width: 44px; height: 44px; margin-right: 4px;"
    />
    <div style="margin-right: 30px;">
      <h5 style="font-size: 15px; color: white;">{contacts[6].name}</h5>
      <p style="font-size: 10px; color: white; opacity: 60%;">
        {contacts[6].role}
      </p>
    </div>
    <Button style="padding: 2px 8px;" class="bg-primary-1">Add</Button>
  </div>
  <div
    class="flex justify-end my-2 mx-4 items-center text-base font-semibold gap-2 border-none justify-between"
  >
    <Avatar
      src={Ellipse8}
      size="xs"
      style="width: 44px; height: 44px; margin-right: 4px;"
    />
    <div style="margin-right: 30px;">
      <h5 style="font-size: 15px; color: white;">{contacts[7].name}</h5>
      <p style="font-size: 10px; color: white; opacity: 60%;">
        {contacts[7].role}
      </p>
    </div>
    <Button style="padding: 2px 8px;" class="bg-primary-1">Add</Button>
  </div>
  <div
    class="flex justify-end my-2 mx-4 items-center text-base font-semibold gap-2 border-none justify-between"
  >
    <Avatar
      src={Ellipse9}
      size="xs"
      style="width: 44px; height: 44px; margin-right: 4px;"
    />
    <div style="margin-right: 30px;">
      <h5 style="font-size: 15px; color: white;">{contacts[8].name}</h5>
      <p style="font-size: 10px; color: white; opacity: 60%;">
        {contacts[8].role}
      </p>
    </div>
    <Button style="padding: 2px 8px;" class="bg-primary-1">Add</Button>
  </div>
</Listgroup>
