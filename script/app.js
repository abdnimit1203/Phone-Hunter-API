//   const ul = document.getElementById("photo-list");
//   for(photo of photos.data){
//     console.log(photo);
//   }
const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  // console.log(phones.length);
  // clear phone container cards before adding new cards
  phoneContainer.textContent = "";
  //display show all buttons if there are more than 12 photos
  const showAllContainer = document.getElementById("showall-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  console.log("is show all", isShowAll);
  //display show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // console.log(phone);

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
                        <button onclick="handleShowDetails('${phone.slug}');show_details_modal.showModal()" class="btn bg-blue-600 hover:bg-blue-800 text-white">Show Details</button>
                      </div>
                    </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
  //hide loading spinner
  toggleLoadingSpinner(false);
};

//handle show details

const handleShowDetails = async (id) => {
  // console.log(id);
  //  load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};
const showPhoneDetails = (phone) => {
  //show modal
  console.log(phone);
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;
  // phoneName.classList.add("underline text-blue-500 mb-4");
  //phone details
  const showDetailContainer = document.getElementById("show-detail-container");

  showDetailContainer.innerHTML = `
            <img src="${phone?.image}" alt="" width="150px">
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <h3 class="font-bold">Storage: ${phone?.mainFeatures?.storage}</h3>
            <h3 class="font-bold">Display Size: ${phone?.mainFeatures?.displaySize}</h3>
            <h3 class="font-bold">Chipset: <span class="font-normal">${phone?.mainFeatures?.chipSet}</span> </h3>
            <h3 class="font-bold">Memory: <span class="font-normal">${phone?.mainFeatures?.memory}</span></h3>
            <h3 class="font-bold">Slug: <span class="font-normal">${phone?.others?.slug || 'No slug available'}</span> </h3>
            <h3 class="font-bold">Price: <span class="font-normal">${phone?.others?.price ? phone?.others?.price : 'price tba'}</span> </h3>
  `;
  //show the modal
  show_details_modal.showModal();
};
//handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const search = document.getElementById("search-btn");
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  loadPhone(searchText, isShowAll);
};

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loading = document.getElementById("loading");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};
// handle Show all
const handleShowAll = () => {
  handleSearch(true);
};
