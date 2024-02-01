<script>
  import { Listgroup, ListgroupItem, Button } from "flowbite-svelte";

  const orderDetails = [
    {
      title: "Product title",
      content: "Banana 3D Model",
    },
    {
      title: "Product description",
      content: "A 3D model of a yellow banana with textures and a UV Map",
    },
    {
      title: "Order number",
      content: "2673901020",
    },
    {
      title: "Program",
      content: "Blender",
    },
    {
      title: "Start date",
      content: "February 23, 1978",
    },
    {
      title: "Expected delivery",
      content: "April 2, 2079",
    },
    {
      title: "Total price",
      content: "$923.22",
    },
    {
      title: "Need help?",
      content: "Click Here",
    },
  ];
</script>

<Listgroup active class="w-100% border-none" style="background: #282828;">
  <h3
    class="p-3 text-xl font-medium text-gray-900"
    style="color: #FF8A00; font-size: 25px;"
  >
    ORDER DETAILS
  </h3>
  {#each orderDetails as item, index}
    <div class="text-base font-semibold gap-2 border-none py-2 px-4">
      <div>
        <h5 class="uppercase" style="font-size: 17px; color: white;">
          {item.title}
        </h5>
        <p style="font-size: 10px; color: white; opacity: 60%;">
          {item.content}
        </p>
      </div>
    </div>
  {/each}
  <div class="grid border-none place-items-center" style="padding: 16px;">
    <Button
      class="mt-30px"
      style="width: 100%; color: white; font-size: 20px; background: #FF8A00;"
      >ORDER AGAIN</Button
    >
  </div>
</Listgroup>
