const loadPhone = async (searchText, dataLimit) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    const showAll = document.getElementById('show-all')
    if (dataLimit && phones.length > 12) {
        phones = phones.slice(0, 12);
        showAll.classList.remove('d-none')
    } else {
        showAll.classList.add('d-none')
    }

    const noPhone = document.getElementById('no-phone');

    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');

        phoneDiv.innerHTML = `
        <div class="card">
            <img src=${phone.image} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <button onClick="handleShowDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv)
    })
    toggleLoader(false);
}

const processSearch = (dataLimit) => {
    toggleLoader(true);
    const searchText = document.getElementById('search-filed').value;
    loadPhone(searchText, dataLimit);
}

const searchPhone = () => {
    processSearch(10)
    // toggleLoader(true);
    // const searchText = document.getElementById('search-filed').value;
    // loadPhone(searchText || 'phone');
}

// Altranative 
// document.getElementById('search-btn').addEventListener('click', function() {
//     const searchText = document.getElementById('search-filed').value;
//     loadPhone(searchText || 'phone')
// })

const toggleLoader = (isLoading) => {
    const loaderSection = document.getElementById('loader');

    if (isLoading) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch()
})

const handleShowDetails = async(slug) => {
    // console.log(slug);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phone) => {
    // console.log(phone);
    const phoneTitle = document.getElementById('phoneDetailsModalLabel').innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Model: ${phone.brand}</p>
        <p>Display: ${phone.mainFeatures.displaySize}</p>
        <p>Display: ${phone.releaseDate ? phone.releaseDate : 'No Release Date'}</p>
    `
}

document.getElementById('search-filed').addEventListener('keypress', function(e) {
    // console.log(e.key);
    if(e.key === 'Enter') {
        processSearch()
    }
})



// loadPhone('phone')