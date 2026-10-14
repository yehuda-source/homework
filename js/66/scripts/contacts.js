function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  // element.style.property = value;
  element.style[property] = value;
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, 'click', callback);
}

const contactsTable = getElement('#contactsTable tbody');
const addContactForm = getElement('#addContact');
const firstInput = getElement('#first');
const lastInput = getElement('#last');
const emailInput = getElement('#email');
const phoneInput = getElement('#phone');
const addContactButton = getElement('#add');
const addButtonsDiv = getElement("#addButtonsDiv");
const addJson = getElement("#addJson");
let contacts = [];

function hideAddContactForm() {
  setCss(addContactForm, 'display', 'none');
  addContactForm.reset();
  setCss(addButtonsDiv, 'visibility', 'visible');
}

on(addContactForm, 'submit', e => {
  e.preventDefault();

 

  const newContact = {
    first: firstInput.value,
    last: lastInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  };
  addNewContact(newContact);
  

  /*const td = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'delete';
  td.appendChild(deleteButton);
  row.appendChild(td);
  deleteButton.addEventListener('click', () => {
    console.log('delete row here');
  });*/

})

    click(addContactButton, () => {
  setCss(addContactForm, 'display', 'block');
  setCss(addButtonsDiv, 'visibility', 'hidden');
});
click(addJson, async () =>{
  const file = await getJson("contacts.json");
  addNewContact(file);

})

click(getElement('#cancel'), hideAddContactForm);
async function getJson(filePath){
  const response = await fetch(filePath);
  const file = await response.json();
  return file;
}
function addNewContact(contact){
  if (!contacts.length) {
    contactsTable.innerHTML = '';
  }
  contacts.push(contact);
   const row = contactsTable.insertRow();

  
  row.innerHTML = `
    <td>${contact.first}</td>
    <td>${contact.last}</td>
    <td>${contact.email}</td>
    <td>${contact.phone}</td>
    <td><button>delete</button></td>
  `;
  row.querySelector('button').addEventListener('click', () =>{
    row.remove();
    contacts = contacts.filter(c => c != contact);
    if(!contacts.length) {
      contactsTable.innerHTML = `<tr>
          <td colspan="5">no contacts loaded</td>
        </tr>`;
    }
  });


  

  hideAddContactForm();
};

