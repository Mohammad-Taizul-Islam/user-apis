const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
const submitButton = document.getElementById('submitButton');

let isEditing = false; // Track if we are in edit mode

// Fetch all users and display them in the table
async function fetchUsers() {
    const response = await fetch('/api/users');
    const users = await response.json();
    userTable.innerHTML = users
        .map(
            (user) => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.address}</td>
            <td>${user.city}</td>
            <td>${user.state}</td>
            <td>${user.zip}</td>
            <td>${user.country}</td>
            <td>${user.company}</td>
            <td>${user.title}</td>
            <td>${user.website}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        </tr>
    `
        )
        .join('');
}

// Add or Update a user
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        country: document.getElementById('country').value,
        company: document.getElementById('company').value,
        title: document.getElementById('title').value,
        website: document.getElementById('website').value,
    };

    if (isEditing) {
        // Update user
        await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        isEditing = false;
        submitButton.textContent = 'Add User';
    } else {
        // Add new user
        await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
    }

    fetchUsers();
    userForm.reset();
    document.getElementById('userId').value = ''; // Clear the hidden userId field
});

// Edit a user
async function editUser(id) {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();

    // Populate the form with the user's data
    document.getElementById('userId').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    document.getElementById('address').value = user.address;
    document.getElementById('city').value = user.city;
    document.getElementById('state').value = user.state;
    document.getElementById('zip').value = user.zip;
    document.getElementById('country').value = user.country;
    document.getElementById('company').value = user.company;
    document.getElementById('title').value = user.title;
    document.getElementById('website').value = user.website;

    // Change the button text to "Update User"
    submitButton.textContent = 'Update User';
    isEditing = true;
}

// Delete a user
async function deleteUser(id) {
    await fetch(`/api/users/${id}`, {
        method: 'DELETE',
    });
    fetchUsers();
}

// Initialize
fetchUsers();