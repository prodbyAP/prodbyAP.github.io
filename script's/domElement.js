const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const itemsContainer = document.getElementById('itemsContainer');
const itemTextInput = document.getElementById('itemText');

let itemCounter = 1;

function addNewItem() {

  const itemText = itemTextInput.value.trim() || `Element ${itemCounter}`;

  const newItem = document.createElement('div');
  newItem.className = 'item';

  newItem.innerHTML = '<span>' + itemText + '</span>' +
    '<button class="item-remove">Remove</button>';

  newItem.querySelector('.item-remove').addEventListener('click', function () {
    newItem.remove();
    checkEmptyContainer();
  });

  itemsContainer.appendChild(newItem);

  itemTextInput.value = '';

  itemCounter++;

  const defaultMessage = itemsContainer.querySelector('p');
  if (defaultMessage) {
    defaultMessage.remove();
  }
}

function checkEmptyContainer() {
  if (itemsContainer.children.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'Result';
    itemsContainer.appendChild(message);
  }
}

addBtn.addEventListener('click', addNewItem);

itemTextInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addNewItem();
  }
});

clearBtn.addEventListener('click', function () {
  itemsContainer.innerHTML = '';
  checkEmptyContainer();
  itemCounter = 1;
});
