

const employeeForm = document.getElementById("employeeForm");

if (employeeForm) {
  const empName = document.getElementById("empName");
  const empDept = document.getElementById("empDept");
  const empSalary = document.getElementById("empSalary");

  employeeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    const employee = {
      id: Date.now(),
      name: empName.value.trim(),
      dept: empDept.value.trim(),
      salary: Number(empSalary.value)
    };

    const error = validateEmployee(employee, employees);
    if (error) {
      alert(error);
      return;
    }

    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));

    alert("Employee saved successfully!");
    employeeForm.reset();
  });
}

// Table rendering
const tableBody = document.querySelector("#employeeTable tbody");

if (tableBody) {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  tableBody.innerHTML = "";

  employees.forEach((emp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.dept}</td>
      <td>${emp.salary}</td>
      <td>
        <button onclick="deleteEmployee(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Delete with confirmation
function deleteEmployee(index) {
  if (!confirm("Are you sure you want to delete this employee?")) return;

  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  location.reload();
}

// Validation logic
function validateEmployee(emp, employees) {
  if (!emp.name) return "Employee name is required";
  if (!/^[a-zA-Z\s]+$/.test(emp.name))
    return "Employee name must contain only letters";

  if (!emp.dept) return "Department is required";

  if (isNaN(emp.salary) || emp.salary <= 0)
    return "Salary must be greater than zero";

  return null;
}
