const form = document.getElementById('form');
const searchBar = document.getElementById('search');
const submitButton = document.getElementById('submit');
const deleteButton = document.getElementById('delete')
const ul = document.getElementById('ul');
let recentSearches;

if (localStorage.recentSearches && localStorage.recentSearches != ''){
     recentSearches = JSON.parse(localStorage.recentSearches);
} else {
     recentSearches = [];
}

const makeListItem = (text, parent) => {
    let listItem = document.createElement('li');
    listItem.textContent = text;
    listItem.className = 'list-group-item';
    parent.appendChild(listItem);
}

recentSearches.forEach(element => {
    makeListItem(element, ul);
});

const isDuplicateValue = (arr, text) => {
  for (let i = 0; i < arr.length; i++){
      if (arr[i] == text){
          return true;
      }
  }

  return false;
}

form.addEventListener('submit', event => {
    event.preventDefault();
    if(searchBar.value == '' || isDuplicateValue(recentSearches, searchBar.value)){
        return;
    } else {
        recentSearches.push(searchBar.value);
        makeListItem(searchBar.value, ul);
        localStorage.recentSearches = JSON.stringify(recentSearches);
        searchBar.value = '';
    }

});

deleteButton.addEventListener('click', () => {
    localStorage.clear();
    recentSearches = [];
    searchBar.value = '';
    // I use querySelectorAll because it returns a static collection
    let arr = document.querySelectorAll('li')
    // I use the static collection for iteration
    for (let i = 0 ; i < arr.length ; i++){
        arr[i].remove();
    }
});

