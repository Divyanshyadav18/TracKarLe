// =========================
// APPLICATION DATA
// =========================

let applications =
    JSON.parse(localStorage.getItem("applications")) || [];



// =========================
// GET HTML ELEMENTS
// =========================

const modal = document.getElementById("applicationModal");

const addApplicationBtn =
    document.getElementById("addApplicationBtn");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const applicationForm =
    document.getElementById("applicationForm");

const applicationsTable =
    document.getElementById("applicationsTable");

const emptyMessage =
    document.getElementById("emptyMessage");

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");


// =========================
// OPEN MODAL
// =========================

addApplicationBtn.addEventListener("click", function () {

    applicationForm.reset();

    document.getElementById("editId").value = "";

    document.getElementById("modalTitle").textContent =
        "Add Application";

    modal.classList.add("show");

});


// =========================
// CLOSE MODAL
// =========================

function closeModal() {

    modal.classList.remove("show");

}

closeModalBtn.addEventListener("click", closeModal);

cancelBtn.addEventListener("click", closeModal);


// =========================
// SAVE APPLICATION
// =========================

applicationForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const company =
        document.getElementById("company").value.trim();

    const position =
        document.getElementById("position").value.trim();

    const status =
        document.getElementById("status").value;

    const date =
        document.getElementById("date").value;

    const jobUrl =
        document.getElementById("jobUrl").value.trim();

    const notes =
        document.getElementById("notes").value.trim();

    const editId =
        document.getElementById("editId").value;


    // EDIT EXISTING APPLICATION

    if (editId) {

        applications = applications.map(function (application) {

            if (application.id == editId) {

                return {
                    id: application.id,
                    company: company,
                    position: position,
                    status: status,
                    date: date,
                    jobUrl: jobUrl,
                    notes: notes
                };

            }

            return application;

        });

    }

    // ADD NEW APPLICATION

    else {

        const newApplication = {

            id: Date.now(),

            company: company,

            position: position,

            status: status,

            date: date,

            jobUrl: jobUrl,

            notes: notes

        };

        applications.push(newApplication);
       
        localStorage.setItem(
        "applications",
        JSON.stringify(applications)
);
localStorage.setItem(
    "applications",
    JSON.stringify(applications)
);  
    }


    renderApplications();

    closeModal();

});


// =========================
// DISPLAY APPLICATIONS
// =========================

function renderApplications() {

    const searchText =
        searchInput.value.toLowerCase();

    const selectedStatus =
        statusFilter.value;


    const filteredApplications =
        applications.filter(function (application) {

            const matchesSearch =
                application.company
                    .toLowerCase()
                    .includes(searchText)

                ||

                application.position
                    .toLowerCase()
                    .includes(searchText);


            const matchesStatus =
                selectedStatus === "all"
                ||
                application.status === selectedStatus;


            return matchesSearch && matchesStatus;

        });


    applicationsTable.innerHTML = "";


    if (filteredApplications.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }


    emptyMessage.style.display = "none";


    filteredApplications.forEach(function (application) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${application.company}
                </strong>
            </td>

            <td>
                ${application.position}
            </td>

            <td>

                <span class="status status-${application.status.toLowerCase()}">

                    ${application.status}

                </span>

            </td>

            <td>
                ${formatDate(application.date)}
            </td>

            <td>

                <button
                    class="action-btn edit-btn"
                    onclick="editApplication(${application.id})"
                >
                    Edit
                </button>

                <button
                    class="action-btn delete-btn"
                    onclick="deleteApplication(${application.id})"
                >
                    Delete
                </button>

            </td>

        `;


        applicationsTable.appendChild(row);

    });

}


// =========================
// FORMAT DATE
// =========================

function formatDate(date) {

    const dateObject = new Date(date);

    return dateObject.toLocaleDateString("en-US", {

        month: "short",

        day: "numeric",

        year: "numeric"

    });

}


// =========================
// DELETE APPLICATION
// =========================

function deleteApplication(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this application?");


    if (!confirmDelete) {

        return;

    }


    applications =
        applications.filter(function (application) {

            return application.id !== id;

        });


    renderApplications();

}


// =========================
// EDIT APPLICATION
// =========================

function editApplication(id) {

    const application =
        applications.find(function (application) {

            return application.id === id;

        });


    if (!application) {

        return;

    }


    document.getElementById("editId").value =
        application.id;

    document.getElementById("company").value =
        application.company;

    document.getElementById("position").value =
        application.position;

    document.getElementById("status").value =
        application.status;

    document.getElementById("date").value =
        application.date;

    document.getElementById("jobUrl").value =
        application.jobUrl;

    document.getElementById("notes").value =
        application.notes;


    document.getElementById("modalTitle").textContent =
        "Edit Application";


    modal.classList.add("show");

}


// =========================
// SEARCH
// =========================

searchInput.addEventListener("input", function () {

    renderApplications();

});


// =========================
// FILTER
// =========================

statusFilter.addEventListener("change", function () {

    renderApplications();

});


// =========================
// INITIAL DISPLAY
// =========================

renderApplications();