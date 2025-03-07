const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Fetch all users and display them
async function fetchUsers() {
    const response = await fetch('/api/users');
    const users = await response.json();
    userList.innerHTML = users.map(user => `
    <li>
      ${user.name}

     <div class="actions">
        <button onclick="editUser(${user.id})" id="edit" >Edit</button>
        <button onclick="deleteUser(${user.id})" id="delete">Delete</button>
      </div
    </li>
  `).join('');
}

// Add a new user
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    const newUser = await response.json();
    fetchUsers();
    userForm.reset();
});


async function editUser(id) {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    const name = prompt('Enter new name', user.name);
    if (name) {
        await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });
        fetchUsers();
    }

  
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