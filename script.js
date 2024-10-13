let resultsArray = [];

function handleLogin() {
    const loginId = document.getElementById('loginId').value;
    const password = document.getElementById('password').value;

    if (loginId === 'navinankam' && password === '3004') {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('dataEntryForm').style.display = 'block';
    } else {
        alert('Invalid Log In ID or Password');
    }
}

function calculateValues() {
    const script = document.getElementById('script').value;
    const marketStructure = document.getElementById('marketStructure').value;
    const trend = document.getElementById('trend').value;
    const chartPattern = document.getElementById('chartPattern').value;
    const candlePattern = document.getElementById('candlePattern').value;
    const rsi = document.getElementById('rsi').value;
    const rsiValue = parseFloat(document.getElementById('rsiValue').value);
    const superTrendSignal = document.getElementById('superTrendSignal').value;
    const superTrendConfirmation = document.getElementById('superTrendConfirmation').value;
    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const stopLoss = parseFloat(document.getElementById('stopLoss').value);
    const target = parseFloat(document.getElementById('target').value);
    const exitPrice = parseFloat(document.getElementById('exitPrice').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    const profitPercentage = ((target - entryPrice) / entryPrice) * 100;
    const pnlAmount = quantity * (exitPrice - entryPrice);
    
    // Push results into an array
    resultsArray.push({
        script,
        marketStructure,
        trend,
        chartPattern,
        candlePattern,
        rsi,
        rsiValue,
        superTrendSignal,
        superTrendConfirmation,
        entryPrice,
        exitPrice,
        profitPercentage,
        pnlAmount
    });

    displayResults();
    document.getElementById('dataForm').reset();
}

function displayResults() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    resultsArray.forEach((result, index) => {
        const row = document.createElement('tr');

        Object.values(result).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => {
            resultsArray.splice(index, 1);
            displayResults();
        };

        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        resultsContainer.appendChild(row);
    });
}

function saveResults() {
    console.log("Saved Results:", resultsArray);
    alert("Results saved to console.");
}

// Export to Excel function
function exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(resultsArray);
    const wb = XLSX.utils.book_new();
    const date = new Date().toLocaleDateString().replace(/\//g, '-');
    XLSX.utils.book_append_sheet(wb, ws, `Results_${date}`);
    XLSX.writeFile(wb, `Results_${date}.xlsx`);
}
