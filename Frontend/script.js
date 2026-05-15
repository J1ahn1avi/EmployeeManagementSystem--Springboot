// 🔗 API Base URL - This connects to your Spring Boot backend
const API_BASE_URL = "http://localhost:8080/api/employees";

// 📌 EXPLANATION:
// This is the address of your Spring Boot backend
// Make sure your backend is running on port 8080

// ============================================
// 🚀 LOAD EMPLOYEES - GET Request
// ============================================
// This function fetches all employees from the backend
// It uses the Fetch API to make a GET request
async function loadEmployees() {
  showLoading(); // Show spinner while loading

  try {
    // 🔍 Making a GET request to backend
    // This calls: EmployeeController.getAllEmployees()
    const response = await fetch(`${API_BASE_URL}/all`);

    // Check if response is ok (status 200)
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }

    // 📦 Parse JSON response from backend
    const employees = await response.json();

    // Display employees in the table
    displayEmployees(employees);
  } catch (error) {
    console.error("Error:", error);
    showError("Failed to load employees");
  } finally {
    hideLoading(); // Hide spinner
  }
}

// ============================================
// 📊 DISPLAY EMPLOYEES - Update HTML Table
// ============================================
function displayEmployees(employees) {
  const tbody = document.getElementById("employeeTableBody");

  if (!employees || employees.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="10" class="text-center">No employees found</td></tr>';
    return;
  }

  // 🎨 Create HTML rows for each employee
  tbody.innerHTML = employees
    .map(
      (employee) => `
        <tr>
            <td>${employee.id}</td>
            <td>${escapeHtml(employee.firstName)}</td>
            <td>${escapeHtml(employee.lastName)}</td>
            <td>${escapeHtml(employee.email)}</td>
            <td>${escapeHtml(employee.phone) || "-"}</td>
            <td>${escapeHtml(employee.department) || "-"}</td>
            <td>${escapeHtml(employee.position) || "-"}</td>
            <td>${employee.salary ? "$" + employee.salary.toLocaleString() : "-"}</td>
            <td>${employee.hireDate || "-"}</td>
            <td>
                <button class="edit-btn" onclick="editEmployee(${employee.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteEmployee(${employee.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `,
    )
    .join("");
}

// ============================================
// ➕ ADD EMPLOYEE - POST Request
// ============================================
document
  .getElementById("employeeForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form from refreshing page

    // 📝 Collect form data
    const employee = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value || null,
      department: document.getElementById("department").value || null,
      position: document.getElementById("position").value || null,
      salary: document.getElementById("salary").value
        ? parseFloat(document.getElementById("salary").value)
        : null,
      hireDate: document.getElementById("hireDate").value || null,
    };

    try {
      // 📤 Making a POST request to backend
      // This calls: EmployeeController.addEmployee()
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Tell backend we're sending JSON
        },
        body: JSON.stringify(employee), // Convert JavaScript object to JSON
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      alert("Employee added successfully!");
      resetForm();
      loadEmployees(); // Refresh the list
    } catch (error) {
      alert("Error: " + error.message);
    }
  });

// ============================================
// ✏️ EDIT EMPLOYEE - GET Request for single employee
// ============================================
async function editEmployee(id) {
  try {
    // 🔍 Get employee data from backend
    const response = await fetch(`${API_BASE_URL}/get/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch employee details");
    }

    const employee = await response.json();

    // Fill modal form with employee data
    document.getElementById("editId").value = employee.id;
    document.getElementById("editFirstName").value = employee.firstName || "";
    document.getElementById("editLastName").value = employee.lastName || "";
    document.getElementById("editEmail").value = employee.email || "";
    document.getElementById("editPhone").value = employee.phone || "";
    document.getElementById("editDepartment").value = employee.department || "";
    document.getElementById("editPosition").value = employee.position || "";
    document.getElementById("editSalary").value = employee.salary || "";
    document.getElementById("editHireDate").value = employee.hireDate || "";

    // Show modal
    document.getElementById("editModal").style.display = "block";
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// ============================================
// 🔄 UPDATE EMPLOYEE - PUT Request
// ============================================
async function updateEmployee() {
  const id = document.getElementById("editId").value;

  const employee = {
    firstName: document.getElementById("editFirstName").value,
    lastName: document.getElementById("editLastName").value,
    email: document.getElementById("editEmail").value,
    phone: document.getElementById("editPhone").value || null,
    department: document.getElementById("editDepartment").value || null,
    position: document.getElementById("editPosition").value || null,
    salary: document.getElementById("editSalary").value
      ? parseFloat(document.getElementById("editSalary").value)
      : null,
    hireDate: document.getElementById("editHireDate").value || null,
  };

  try {
    // 📤 Making a PUT request to backend
    // This calls: EmployeeController.updateEmployee()
    const response = await fetch(`${API_BASE_URL}/update/${id}`, {
      method: "PUT", // PUT for updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    if (!response.ok) {
      throw new Error("Failed to update employee");
    }

    alert("Employee updated successfully!");
    closeModal();
    loadEmployees(); // Refresh the list
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// ============================================
// 🗑️ DELETE EMPLOYEE - DELETE Request
// ============================================
async function deleteEmployee(id) {
  if (!confirm("Are you sure you want to delete this employee?")) {
    return;
  }

  try {
    // 📤 Making a DELETE request to backend
    // This calls: EmployeeController.deleteEmployee()
    const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: "DELETE", // DELETE method
    });

    if (!response.ok) {
      throw new Error("Failed to delete employee");
    }

    alert("Employee deleted successfully!");
    loadEmployees(); // Refresh the list
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// ============================================
// 🔍 SEARCH EMPLOYEES - GET with query parameter
// ============================================
async function searchEmployees() {
  const searchTerm = document.getElementById("searchInput").value.trim();

  if (!searchTerm) {
    loadEmployees(); // If empty, load all
    return;
  }

  try {
    showLoading();

    // 📤 GET request with query parameter
    // This calls: EmployeeController.searchEmployees(?name=...)
    const response = await fetch(
      `${API_BASE_URL}/search?name=${encodeURIComponent(searchTerm)}`,
    );

    if (!response.ok) {
      throw new Error("Search failed");
    }

    const employees = await response.json();
    displayEmployees(employees);
  } catch (error) {
    console.error("Error:", error);
    showError("Search failed");
  } finally {
    hideLoading();
  }
}

// ============================================
// 🎯 FILTER BY DEPARTMENT - GET with path variable
// ============================================
async function filterByDepartment() {
  const department = document.getElementById("departmentFilter").value;

  if (!department) {
    loadEmployees(); // If no filter, load all
    return;
  }

  try {
    showLoading();

    // 📤 GET request with path variable
    // This calls: EmployeeController.getByDepartment(IT)
    const response = await fetch(
      `${API_BASE_URL}/department/${encodeURIComponent(department)}`,
    );

    if (!response.ok) {
      throw new Error("Filter failed");
    }

    const employees = await response.json();
    displayEmployees(employees);
  } catch (error) {
    console.error("Error:", error);
    showError("Filter failed");
  } finally {
    hideLoading();
  }
}

// ============================================
// 🛡️ Security: Escape HTML to prevent XSS attacks
// ============================================
function escapeHtml(text) {
  if (!text) return text;
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// 🔧 Helper Functions
// ============================================

// Reset the add form
function resetForm() {
  document.getElementById("employeeForm").reset();
}

// Close modal
function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

// Show loading spinner
function showLoading() {
  document.getElementById("loadingSpinner").style.display = "block";
}

// Hide loading spinner
function hideLoading() {
  document.getElementById("loadingSpinner").style.display = "none";
}

// Show error message
function showError(message) {
  const tbody = document.getElementById("employeeTableBody");
  tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color: #f56565;">${message}</td></tr>`;
}

// Load employees when page loads
document.addEventListener("DOMContentLoaded", loadEmployees);

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("editModal");
  if (event.target === modal) {
    closeModal();
  }
};
const API_BASE_URL = 'http://localhost:8080/api/employees';

// Pagination variables
let currentPage = 0;
let pageSize = 10;
let totalPages = 1;
let totalElements = 0;
let sortBy = 'id';
let sortOrder = 'asc';

// Load employees with pagination
async function loadEmployees() {
    showLoading();
    try {
        const url = `${API_BASE_URL}/paginated?page=${currentPage}&size=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Failed to fetch employees');
        
        const pageData = await response.json();
        
        totalPages = pageData.totalPages;
        totalElements = pageData.totalElements;
        currentPage = pageData.number;
        
        displayEmployees(pageData.content);
        updatePaginationControls();
        
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to load employees');
    } finally {
        hideLoading();
    }
}

// Display employees in table (updated for pagination)
function displayEmployees(employees) {
    const tbody = document.getElementById('employeeTableBody');
    
    if (!employees || employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center;">No employees found</td></tr>';
        return;
    }
    
    tbody.innerHTML = employees.map(emp => `
        <tr>
            <td>${emp.id}</td>
            <td>${escapeHtml(emp.firstName || '')}</td>
            <td>${escapeHtml(emp.lastName || '')}</td>
            <td>${escapeHtml(emp.email || '')}</td>
            <td>${escapeHtml(emp.phone || '-')}</td>
            <td>${escapeHtml(emp.department || '-')}</td>
            <td>${escapeHtml(emp.position || '-')}</td>
            <td>${emp.salary ? '$' + emp.salary.toLocaleString() : '-'}</td>
            <td>${emp.hireDate || '-'}</td>
            <td>
                <button class="edit-btn" onclick="editEmployee(${emp.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteEmployee(${emp.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
}

// Pagination functions
function updatePaginationControls() {
    document.getElementById('currentPage').textContent = currentPage + 1;
    document.getElementById('totalPages').textContent = totalPages;
    document.getElementById('totalRecords').textContent = totalElements;
    
    const startRecord = currentPage * pageSize + 1;
    const endRecord = Math.min((currentPage + 1) * pageSize, totalElements);
    document.getElementById('pageStart').textContent = totalElements === 0 ? 0 : startRecord;
    document.getElementById('pageEnd').textContent = endRecord;
    
    document.getElementById('prevBtn').disabled = currentPage === 0;
    document.getElementById('nextBtn').disabled = currentPage >= totalPages - 1;
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        loadEmployees();
    }
}

function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        loadEmployees();
    }
}

function changePageSize() {
    pageSize = parseInt(document.getElementById('pageSize').value);
    currentPage = 0; // Reset to first page
    loadEmployees();
}

// Keep your existing functions (addEmployee, editEmployee, updateEmployee, deleteEmployee)
// ... all your existing CRUD functions remain the same ...

// Modify search to work with pagination
async function searchEmployees() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    
    if (!searchTerm) {
        loadEmployees();
        return;
    }
    
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/search?name=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error('Search failed');
        const employees = await response.json();
        displayEmployees(employees);
        // Hide pagination when searching
        document.querySelector('.pagination-container').style.display = 'none';
    } catch (error) {
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}

// Modify filter to work with pagination
async function filterByDepartment() {
    const department = document.getElementById('departmentFilter').value;
    
    if (!department) {
        loadEmployees();
        document.querySelector('.pagination-container').style.display = 'flex';
        return;
    }
    
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/department/${encodeURIComponent(department)}`);
        if (!response.ok) throw new Error('Filter failed');
        const employees = await response.json();
        displayEmployees(employees);
        document.querySelector('.pagination-container').style.display = 'none';
    } catch (error) {
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}

// Reset search/filter
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('departmentFilter').value = '';
    document.querySelector('.pagination-container').style.display = 'flex';
    loadEmployees();
}

// Add reset button to search section
// Add this to your search-section in HTML if desired