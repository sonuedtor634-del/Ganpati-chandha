<!DOCTYPE html>
<html lang="te">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ganesh Chanda Collection</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #fff8e1;
      margin: 0; padding: 0;
    }
    header {
      background: #ff6f00;
      color: white;
      padding: 15px;
      text-align: center;
      font-size: 1.4em;
      font-weight: bold;
    }
    .container {
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
    }
    .left, .right {
      flex: 1;
      min-width: 280px;
      padding: 15px;
      box-sizing: border-box;
    }
    .card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      padding: 20px;
      margin-bottom: 20px;
    }
    label { display: block; margin: 10px 0 5px; }
    input, select {
      width: 100%; padding: 8px;
      border: 1px solid #ccc; border-radius: 5px;
    }
    button {
      background: #ff6f00; color: white;
      border: none; padding: 10px 15px;
      border-radius: 5px; cursor: pointer;
      margin-top: 10px;
    }
    button:hover { background: #e65100; }
    table {
      width: 100%; border-collapse: collapse;
      margin-top: 10px;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px; text-align: center;
    }
    th { background: #ffe0b2; }
    .stats {
      font-size: 1.2em;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <header>🙏 Ganesh Chanda Collection 🙏</header>
  <div class="container">
    <div class="left">
      <div class="card">
        <h3>New Contribution</h3>
        <label>Donor Name</label>
        <input id="name" placeholder="Enter name">

        <label>Amount (₹)</label>
        <input id="amount" type="number" placeholder="Enter amount">

        <label>Mode</label>
        <select id="mode">
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
        </select>

        <button onclick="saveEntry()">Save Entry</button>
        <button onclick="makeUPIPayment()">Open UPI App</button>
        <button onclick="showQR()">Show QR</button>
      </div>

      <div class="card">
        <h3>Entries</h3>
        <table id="entryTable">
          <tr><th>Name</th><th>Amount</th><th>Mode</th></tr>
        </table>
        <button onclick="exportCSV()">Export CSV</button>
      </div>
    </div>

    <div class="right">
      <div class="card">
        <h3>Stats</h3>
        <div id="cashTotal" class="stats">Cash: ₹0</div>
        <div id="upiTotal" class="stats">UPI: ₹0</div>
        <div id="grandTotal" class="stats">Total: ₹0</div>
      </div>

      <div class="card">
        <h3>Receipt</h3>
        <div id="receipt"></div>
        <button onclick="printReceipt()">Print Receipt</button>
        <button onclick="shareWhatsApp()">Share WhatsApp</button>
      </div>
    </div>
  </div>

  <script>
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
      const amount = parseInt(document.getElementById("amount"
