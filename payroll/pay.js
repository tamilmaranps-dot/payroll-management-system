// auth check
(function checkAuth() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "../login/login.html";
  }
})();

//  Get employee dropdown
const employeeSelect = document.getElementById("employeeSelect");

// 📦 Load employees safely
let employees = [];
try {
  employees = JSON.parse(localStorage.getItem("employees")) || [];
} catch {
  localStorage.removeItem("employees");
  employees = [];
}

//  Populate employee dropdown
if (employeeSelect) {
  employees.forEach(emp => {
    const option = document.createElement("option");
    option.value = emp.id;
    option.textContent = `${emp.name} (${emp.dept})`;
    employeeSelect.appendChild(option);
  });
}

//  Payroll form handling
const payrollForm = document.getElementById("payrollForm");

if (payrollForm) {
  payrollForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const empId = employeeSelect.value;
    const allowance = Number(document.getElementById("allowance").value);
    const deduction = Number(document.getElementById("deduction").value);
    const resultEl = document.getElementById("result");

    // 1️⃣ Employee selection validation
    if (!empId) {
      alert("Please select an employee");
      return;
    }

    const employee = employees.find(emp => emp.id == empId);
    if (!employee) {
      alert("Selected employee not found");
      return;
    }

    // 2️⃣ Allowance validation
    if (isNaN(allowance) || allowance < 0) {
      alert("Allowance must be a valid non-negative number");
      return;
    }

    // 3️⃣ Deduction validation
    if (isNaN(deduction) || deduction < 0) {
      alert("Deduction must be a valid non-negative number");
      return;
    }

    const grossSalary = employee.salary + allowance;

    // 4️⃣ Business rule validation
    if (deduction > grossSalary) {
      alert("Deduction cannot exceed gross salary");
      return;
    }

    // 5️⃣ Final salary calculation
    const netSalary = grossSalary - deduction;

    // 📦 Save payroll record
    let payroll = [];
    try {
      payroll = JSON.parse(localStorage.getItem("payroll")) || [];
    } catch {
      localStorage.removeItem("payroll");
      payroll = [];
    }

    payroll.push({
      empId: employee.id,
      name: employee.name,
      baseSalary: employee.salary,
      allowance,
      deduction,
      netSalary,
      date: new Date().toLocaleDateString()
    });

    localStorage.setItem("payroll", JSON.stringify(payroll));

    // ✅ Show result
    if (resultEl) {
      resultEl.innerText = `Net Salary for ${employee.name}: ₹${netSalary}`;
    }

    payrollForm.reset();
  });
}

