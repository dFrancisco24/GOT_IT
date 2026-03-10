

function handleForm(type, redirectPage){

const form = document.getElementById("itemForm");
if(!form) return;

form.addEventListener("submit", function(e){

e.preventDefault();

const fileInput = document.getElementById("itemImage");
const file = fileInput ? fileInput.files[0] : null;

if(type === "lost"){
searchFoundItems();
return;
}

if(file){

const reader = new FileReader();

reader.onload = function(){
saveItem(type, reader.result);
window.location.href = redirectPage;
};

reader.readAsDataURL(file);

}else{

saveItem(type, null);
window.location.href = redirectPage;

}

});

}




function saveItem(type, imageData){

let items = JSON.parse(localStorage.getItem(type + "Items")) || [];

const newItem = {

name: document.getElementById("name").value.toLowerCase(),
description: document.getElementById("description").value.toLowerCase(),
category: document.getElementById("category").value.toLowerCase(),
location: document.getElementById("location").value.toLowerCase(),
date: document.getElementById("date").value,
contact: document.getElementById("contact").value,
image: imageData,
status: type

};

items.push(newItem);

localStorage.setItem(type + "Items", JSON.stringify(items));

}




function searchFoundItems(){

const name = document.getElementById("name").value.toLowerCase();
const category = document.getElementById("category").value.toLowerCase();
const location = document.getElementById("location").value.toLowerCase();

let foundItems = JSON.parse(localStorage.getItem("foundItems")) || [];

/* FILTER MATCHING ITEMS */

const matches = foundItems.filter(item => {

return (

item.name.includes(name) &&
item.category.includes(category) &&
item.location.includes(location)

);

});



localStorage.setItem("searchResults", JSON.stringify(matches));

window.location.href = "items.html";

}




function loadItems(){

const container = document.getElementById("results");
if(!container) return;

let items = JSON.parse(localStorage.getItem("searchResults")) || [];

container.innerHTML = "";

if(items.length === 0){

container.innerHTML = "<p style='text-align:center;'>No matching items found.</p>";
return;

}

items.forEach(item => {

container.innerHTML += `

<div class="item-card">

<div class="status found">
FOUND
</div>

${item.image ? `
<img src="${item.image}" 
class="item-image"
onclick='openImage(${JSON.stringify(item)})'>
` : ""}

<div class="item-info">

<h3>${item.name}</h3>

<p><b>Description:</b> ${item.description}</p>
<p><b>Category:</b> ${item.category}</p>
<p><b>Location:</b> ${item.location}</p>
<p><b>Date:</b> ${item.date}</p>
<p><b>Contact:</b> ${item.contact}</p>

</div>

</div>

`;

});

}




function searchItem(){

const input = document.getElementById("searchInput").value.toLowerCase();

const cards = document.querySelectorAll(".item-card");

cards.forEach(card => {

card.style.display = card.innerText.toLowerCase().includes(input) ? "block" : "none";

});

}




function openImage(item){

const modal = document.getElementById("imageModal");
if(!modal) return;

modal.style.display="flex";

document.getElementById("modalImg").src=item.image;

document.getElementById("modalDetails").innerHTML=`

<h3>${item.name}</h3>

<p><b>Description:</b> ${item.description}</p>
<p><b>Category:</b> ${item.category}</p>
<p><b>Location:</b> ${item.location}</p>
<p><b>Date:</b> ${item.date}</p>
<p><b>Contact:</b> ${item.contact}</p>

`;

}

function closeImageModal(){

const modal=document.getElementById("imageModal");

if(modal) modal.style.display="none";

}




document.addEventListener("DOMContentLoaded", function(){

const adminBtn=document.getElementById("adminBtn");

if(adminBtn){

adminBtn.addEventListener("click", function(){

const modal=document.getElementById("adminModal");

if(modal) modal.style.display="flex";

});

}

});


function closeAdminModal(){

const modal=document.getElementById("adminModal");

if(modal) modal.style.display="none";

}




function checkAdmin(){

const password=document.getElementById("adminPassword").value;

if(password==="admin123"){

localStorage.setItem("isAdmin","true");

window.location.href="admin-dashboard.html";

}else{

alert("Wrong password");

}


}
