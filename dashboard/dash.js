//  Auth protection 
function checkAuth() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "../login/login.html";
  }
}
checkAuth();

//  Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../login/login.html";
}

//  Employee count
const employees = JSON.parse(localStorage.getItem("employees")) || [];
const empCountEl = document.getElementById("empCount");

if (empCountEl) {
  empCountEl.innerText = employees.length;
}

// Total payroll calculation
const payroll = JSON.parse(localStorage.getItem("payroll")) || [];
const totalPayrollEl = document.getElementById("totalPayroll");

let totalPayroll = 0;
payroll.forEach(record => {
  totalPayroll += Number(record.netSalary || 0);
});

if (totalPayrollEl) {
  totalPayrollEl.innerText = "₹" + totalPayroll;
}

