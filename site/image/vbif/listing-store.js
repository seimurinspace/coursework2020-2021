window.onload = function () {
  // состояние приложения: данные
  var listingElements = ['apple', 'orange'];
  var storeElements = [];

  // логика JS, не связана с DOM
  // данная функция работает только с состоянием
  function addToStoreElements(element) {
    var elementPosition = listingElements.indexOf(element);
    if (elementPosition > -1) {
      storeElements.push(element);
      listingElements.splice(elementPosition, 1);
    }
  }
  function addToListingElements(element) {
    var elementPosition = storeElements.indexOf(element);
    if (elementPosition > -1) {
      listingElements.push(element);
      storeElements.splice(elementPosition, 1);
    }
  }
  function deleteElements(element) {
    var elementPositionListing = listingElements.indexOf(element.textContent);
    if (elementPositionListing > -1) {
      listingElements.splice(elementPositionListing, 1);
    }
    var elementPositionStore = storeElements.indexOf(element.textContent);
    if (elementPositionStore > -1) {
      storeElements.splice(elementPositionStore, 1);
    }
  }
  function addNewElements() {
    var elemName = prompt('Enter name of the item');
    listingElements.push(elemName);
  }
  function updateTotalElements(element, id) {
    if (id === 'listing') {
      element.textContent = `Listing (${listingElements.length}):`;
    } else if (id === 'store') {
      element.textContent = `Store (${storeElements.length}):`;
    }
  }

  // updateUI берет данные из массивов и вставляет в DOM
  function updateUI() {
    var storeSelect = document.querySelector('.store-select');
    var listingSelect = document.querySelector('.listing-select');
    storeSelect.innerHTML = '';
    listingSelect.innerHTML = '';

    // вставка количества элементов
    var totalListing = document.querySelector('.listing-total');
    var totalStore = document.querySelector('.store-total');
    updateTotalElements(totalListing, 'listing');
    updateTotalElements(totalStore, 'store');

    // вставка элементов из Listing
    for (var i = 0; i < listingElements.length; i++) {
      var newOption = document.createElement('option');
      newOption.innerText = listingElements[i];
      listingSelect.append(newOption);
    }

    // вставка элементов из Store
    for (var i = 0; i < storeElements.length; i++) {
      var newOption = document.createElement('option');
      newOption.innerText = storeElements[i];
      storeSelect.append(newOption);
    }
  }

  // событие для кнопки "Add to store"
  var addListingButton = document.querySelector('#add-listing-button');
  addListingButton.onclick = function () {
    var selectedOptionListing = document.querySelector(
      '.listing-select option:checked'
    );
    console.log(selectedOptionListing);
    addToStoreElements(selectedOptionListing.innerText);
    updateUI();
  };

  // событие для кнопки "Add to Listing"
  var addStoreButton = document.querySelector('#add-store-button');
  console.log(addStoreButton);
  addStoreButton.onclick = function () {
    var selectedOptionStore = document.querySelector(
      '.store-select option:checked'
    );
    console.log(selectedOptionStore);
    addToListingElements(selectedOptionStore.innerText);
    updateUI();
  };

  // событие для кнопки "Delete element"
  var deleteButton = document.querySelector('#delete-button');
  deleteButton.onclick = function () {
    var selectedOption = document.querySelector('.select option:checked');
    if (!selectedOption) {
      console.log('выделите элемент');
    } else {
      deleteElements(selectedOption);
    }
    updateUI();
  };

  // событие для кнопки "Add new element"
  var addNewButton = document.querySelector('#add-new-button');
  addNewButton.onclick = function () {
    addNewElements();
    updateUI();
  };

  // запускаем начальное обновление интерфейса
  // для первоначального вывода данных из состояния в UI
  updateUI();
};