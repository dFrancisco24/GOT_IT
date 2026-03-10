const items = [
{
name: "Black Leather Wallet",
description: "Black leather wallet with multiple card slots.",
category: "wallet",
location: "Library - 3rd Floor",
status: "lost",
image: "images/wallet.jpg"
},

{
name: "Silver iPhone 15 Pro",
description: "Silver iPhone 15 Pro with clear case.",
category: "phone",
location: "Student Center Cafeteria",
status: "lost",
image: "images/iphone.jpg"
},

{
name: "Blue Backpack",
description: "Navy blue backpack with red straps.",
category: "bag",
location: "Engineering Building",
status: "lost",
image: "images/backpack.jpg"
},

{
name: "Black Umbrella",
description: "Compact umbrella with wooden handle.",
category: "accessory",
location: "Main Lobby",
status: "found",
image: "images/umbrella.jpg"
}
];

const grid = document.getElementById("itemsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");


function displayItems(){

grid.innerHTML = "";

const search = searchInput.value.toLowerCase();
const category = categoryFilter.value;

const filtered = items.filter(item =>
item.status === "lost" &&
item.name.toLowerCase().includes(search) &&
(category === "all" || item.category === category)
);

filtered.forEach(item => {

const card = `
<div class="card">

<img src="${item.image}">

<div class="card-content">

<h3>${item.name} <span class="tag">Lost</span></h3>

<p>${item.description}</p>

<p class="meta">🏷 ${item.category}</p>
<p class="meta">📍 ${item.location}</p>

</div>

</div>
`;

grid.innerHTML += card;

});

}


searchInput.addEventListener("keyup", displayItems);
categoryFilter.addEventListener("change", displayItems);


displayItems();
