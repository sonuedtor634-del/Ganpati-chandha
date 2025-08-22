let entries = JSON.parse(localStorage.getItem("ganeshEntries") || "[]");
const upiId = "9014194356@fam";

function refreshTable() {
  const table = document.getElementById("entryTable");
  table.innerHTML = "<tr><th>Name</th><th>Amount</th><th>Mode</th></tr>";
  let cashTotal = 0, upiTotal = 0;
  entries.forEach(e => {
    let row = `<tr><td>${e.name}</td><td>₹${e.amount}</td><td>${e.mode}</td></tr>`;
    table.innerHTML += row;
    if(e.mode === "Cash") cashTotal += e.amount;
    else upiTotal += e.amount;
  });
  document.getElementById("cashTotal").innerText = "Cash: ₹" + cashTotal;
  document.getElementById("upiTotal").innerText = "UPI: ₹" + upiTotal;
  document.getElementById("grandTotal").innerText = "Total: ₹" + (cashTotal + upiTotal);
}

function saveEntry() {
  const name = document.getElementById("name").value.trim();
  const amount = parseInt(document.getElementById("amount").value);
  const mode = document.getElementById("mode").value;
  if(!name || !amount) { alert("Enter name & amount"); return; }
  const entry = { name, amount, mode };
  entries.push(entry);
  localStorage.setItem("ganeshEntries", JSON.stringify(entries));
  refreshTable();
  document.getElementById("receipt").innerText =
    `Receipt:\nName: ${name}\nAmount: ₹${amount}\nMode: ${mode}`;
}

function exportCSV() {
  let csv = "Name,Amount,Mode\n";
  entries.forEach(e => {
    csv += `${e.name},${e.amount},${e.mode}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ganesh_chanda.csv";
  link.click();
}

function makeUPIPayment() {
  const amount = document.getElementById("amount").value;
  const name = document.getElementById("name").value;
  if(!amount) { alert("Enter amount"); return; }
  const url = `upi://pay?pa=${upiId}&pn=Ganesh%20Committee&am=${amount}&tn=Ganesh%20Chanda%20by%20${name}`;
  window.location.href = url;
}

function showQR() {
  alert("QR Code can be generated here for UPI ID: " + upiId);
}

function printReceipt() {
  const content = document.getElementById("receipt").innerText;
  const w = window.open();
  w.document.write("<pre>"+content+"</pre>");
  w.print();
  w.close();
}

function shareWhatsApp() {
  const content = document.getElementById("receipt").innerText;
  const url = "https://wa.me/?text=" + encodeURIComponent(content);
  window.open(url, "_blank");
}

refreshTable();