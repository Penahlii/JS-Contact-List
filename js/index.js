document.addEventListener("DOMContentLoaded", function () {
  const contactTable = document
    .getElementById("contactTable")
    .getElementsByTagName("tbody")[0];
  const addContactBtn = document.getElementById("addContactBtn");
  const searchInput = document.getElementById("search");

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  const renderContacts = () => {
    contactTable.innerHTML = "";
    contacts.forEach((contact, index) => {
      let row = contactTable.insertRow();
      row.insertCell(0).innerHTML = contact.name;
      row.insertCell(1).innerHTML = contact.phone;
      row.insertCell(2).innerHTML = contact.email;
      let actionsCell = row.insertCell(3);
      actionsCell.innerHTML = `<button onclick="editContact(${index})">Edit</button>
                                     <button onclick="deleteContact(${index})">Delete</button>`;
    });
  };

  const addContact = () => {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    if (!name || !phone || !email) {
      alert("Please fill in all fields");
      return;
    }

    if (!validateEmail(email) || !validatePhone(phone)) {
      alert("Please enter valid email and phone number");
      return;
    }

    contacts.push({ name, phone, email });
    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContacts();
  };

  const editContact = (index) => {
    const name = prompt("Enter new name:", contacts[index].name);
    const phone = prompt("Enter new phone:", contacts[index].phone);
    const email = prompt("Enter new email:", contacts[index].email);

    if (!name || !phone || !email) {
      alert("Please fill in all fields");
      return;
    }

    if (!validateEmail(email) || !validatePhone(phone)) {
      alert("Please enter valid email and phone number");
      return;
    }

    contacts[index] = { name, phone, email };
    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContacts();
  };

  const deleteContact = (index) => {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContacts();
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredContacts = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.phone.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm)
    );
    renderFilteredContacts(filteredContacts);
  });

  const renderFilteredContacts = (filteredContacts) => {
    contactTable.innerHTML = "";
    filteredContacts.forEach((contact, index) => {
      let row = contactTable.insertRow();
      row.insertCell(0).innerHTML = contact.name;
      row.insertCell(1).innerHTML = contact.phone;
      row.insertCell(2).innerHTML = contact.email;
      let actionsCell = row.insertCell(3);
      actionsCell.innerHTML = `<button onclick="editContact(${index})">Edit</button>
                                     <button onclick="deleteContact(${index})">Delete</button>`;
    });
  };

  addContactBtn.addEventListener("click", addContact);

  renderContacts();
});
