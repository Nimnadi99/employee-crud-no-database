let selectedRow = null;

// Show alerts
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    // Append the alert to the container
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    // Remove the alert after 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All fields
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#nicNo").value = "";
}

// Add Data
document.querySelector("#employee-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const nic = document.querySelector("#nicNo").value;

    // Validate
    if (firstName === "" || lastName === "" || nic === "") {
        showAlert("Please Fill all the fields", "danger");
    } else {
        if (selectedRow === null) {
            const list = document.querySelector("#employee-list");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${nic}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            showAlert("Student Added!!", "success");
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = nic;
            selectedRow = null;
            showAlert("Student Updated!!", "success");
        }
        clearFields();
    }
});

// Edit Data
document.querySelector("#employee-list").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.closest("tr");
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#nicNo").value = selectedRow.children[2].textContent;
    }
});

// Delete Data
document.querySelector("#employee-list").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("delete")) {
        target.closest("tr").remove();
        showAlert("Student Data Deleted", "danger");
    }
});
