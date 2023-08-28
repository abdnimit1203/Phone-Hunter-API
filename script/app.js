//   const ul = document.getElementById("photo-list");
//   for(photo of photos.data){
//     console.log(photo);
//   }
const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};
const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container cards before adding new cards
  phoneContainer.textContent = ''
  
  phones.forEach((phone) => {
    console.log(phone);
    console.log();
    // 1 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-80 bg-blue-100 shadow-lg mx-auto`;
    phoneCard.innerHTML = `
                    <figure class="px-10 pt-10">
                      <img src="${phone.image}" alt="Phone Picture" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>PHONE DESCRIPTION: ${phone.brand}</p>
                      <h3 class="font-bold">$99</h3>
                      <div class="card-actions">
                        <button class="btn bg-blue-600 hover:bg-blue-800 text-white">Show Details</button>
                      </div>
                    </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
};

//handle search button
const handleSearch = () => {
  const search = document.getElementById("search-btn");
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
};
