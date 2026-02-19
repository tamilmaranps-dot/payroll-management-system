// 🔐 Protect page
(function checkAuth() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "../login/login.html";
  }
})();

const select = document.getElementById("payslipSelect");
const card = document.getElementById("payslipCard");

// 📦 Load payroll safely
let payroll = [];
try {
  payroll = JSON.parse(localStorage.getItem("payroll")) || [];
} catch {
  localStorage.removeItem("payroll");
  payroll = [];
}

// 🚫 Handle empty payroll
if (payroll.length === 0) {
  select.innerHTML = `<option value="">No payslips available</option>`;
  card.style.display = "none";
} else {
  payroll.forEach((p, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${p.name} - ${p.date}`;
    select.appendChild(opt);
  });
}

// 🧾 Payslip selection
select.addEventListener("change", () => {
  const idx = select.value;

  if (idx === "") {
    card.style.display = "none";
    return;
  }

  const p = payroll[idx];

  // 🛡️ Validation
  if (!p) {
    alert("Payslip record not found");
    card.style.display = "none";
    return;
  }

  if (p.netSalary == null) {
    alert("Salary not calculated");
    card.style.display = "none";
    return;
  }

  // 📄 Populate payslip
  document.getElementById("psName").innerText = p.name;
  document.getElementById("psDate").innerText = p.date;
  document.getElementById("psBase").innerText = p.baseSalary;
  document.getElementById("psAllow").innerText = p.allowance;
  document.getElementById("psDeduct").innerText = p.deduction;
  document.getElementById("psNet").innerText = p.netSalary;

  card.style.display = "block";
});
