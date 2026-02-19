const tableBody = document.querySelector("#payrollTable tbody");

if (tableBody) {
  const payrollData = JSON.parse(localStorage.getItem("payroll")) || [];

  tableBody.innerHTML = "";

  if (payrollData.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="6">No payroll records found</td>`;
    tableBody.appendChild(row);
  } else {
    payrollData.forEach(record => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${record.date}</td>
        <td>${record.name}</td>
        <td>₹${record.baseSalary}</td>
        <td>₹${record.allowance}</td>
        <td>₹${record.deduction}</td>
        <td><strong>₹${record.netSalary}</strong></td>
      `;
      tableBody.appendChild(row);
    });
  }
}
