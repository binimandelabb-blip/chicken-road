// Wallet state management
let walletBalance = 0.00;
let transactions = [];
let currentLanguage = 'en';

// Translations
const translations = {
    en: {
        walletTitle: 'Ethiopian Birr Wallet',
        balanceLabel: 'Current Balance:',
        depositBtnText: '💰 Deposit',
        withdrawBtnText: '💸 Withdraw',
        historyTitle: 'Transaction History',
        noTransactions: 'No transactions yet',
        depositModalTitle: 'Deposit Ethiopian Birr',
        depositAmountLabel: 'Enter Amount (ETB):',
        depositSubmitText: 'Confirm Deposit',
        withdrawModalTitle: 'Withdraw Ethiopian Birr',
        withdrawAmountLabel: 'Enter Amount (ETB):',
        withdrawSubmitText: 'Confirm Withdrawal',
        withdrawInfo: 'Available Balance:',
        depositSuccess: 'Deposit successful!',
        withdrawSuccess: 'Withdrawal successful!',
        insufficientFunds: 'Insufficient funds!',
        invalidAmount: 'Please enter a valid amount'
    },
    am: {
        walletTitle: 'የኢትዮጵያ ብር ኪስ',
        balanceLabel: 'የአሁን ቀሪ ሂሳብ:',
        depositBtnText: '💰 ገቢ አድርግ',
        withdrawBtnText: '💸 ውጪ አውጣ',
        historyTitle: 'የግብይት ታሪክ',
        noTransactions: 'ገና ምንም ግብይት የለም',
        depositModalTitle: 'የኢትዮጵያ ብር ገቢ ማድረግ',
        depositAmountLabel: 'መጠን ያስገቡ (ብር):',
        depositSubmitText: 'ገቢ አረጋግጥ',
        withdrawModalTitle: 'የኢትዮጵያ ብር መውጣት',
        withdrawAmountLabel: 'መጠን ያስገቡ (ብር):',
        withdrawSubmitText: 'መውጣት አረጋግጥ',
        withdrawInfo: 'የሚገኝ ሂሳብ:',
        depositSuccess: 'ገቢ በተሳካ ሁኔታ ተከናውኗል!',
        withdrawSuccess: 'መውጣት በተሳካ ሁኔታ ተከናውኗል!',
        insufficientFunds: 'በቂ ገንዘብ የለም!',
        invalidAmount: 'እባክዎ ትክክለኛ መጠን ያስገቡ'
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadWalletData();
    updateDisplay();
    setupLanguageSelector();
});

// Load wallet data from localStorage
function loadWalletData() {
    const savedBalance = localStorage.getItem('walletBalance');
    const savedTransactions = localStorage.getItem('transactions');
    
    if (savedBalance) {
        walletBalance = parseFloat(savedBalance);
    }
    
    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
    }
}

// Save wallet data to localStorage
function saveWalletData() {
    localStorage.setItem('walletBalance', walletBalance.toFixed(2));
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Update all display elements
function updateDisplay() {
    updateBalanceDisplay();
    updateTransactionHistory();
    updateLanguage();
}

// Update balance display
function updateBalanceDisplay() {
    const balanceElement = document.getElementById('balanceAmount');
    const availableBalanceElement = document.getElementById('availableBalance');
    
    if (balanceElement) {
        balanceElement.textContent = `${walletBalance.toFixed(2)} ETB`;
    }
    
    if (availableBalanceElement) {
        availableBalanceElement.textContent = `${walletBalance.toFixed(2)} ETB`;
    }
}

// Update transaction history display
function updateTransactionHistory() {
    const transactionList = document.getElementById('transactionList');
    
    if (transactions.length === 0) {
        transactionList.innerHTML = `<p id="noTransactions">${translations[currentLanguage].noTransactions}</p>`;
        return;
    }
    
    let html = '';
    // Show latest transactions first
    const recentTransactions = transactions.slice().reverse().slice(0, 10);
    
    recentTransactions.forEach(transaction => {
        const typeClass = transaction.type === 'deposit' ? 'deposit' : 'withdraw';
        const sign = transaction.type === 'deposit' ? '+' : '-';
        const typeText = transaction.type === 'deposit' ? 
            (currentLanguage === 'en' ? 'Deposit' : 'ገቢ') : 
            (currentLanguage === 'en' ? 'Withdraw' : 'መውጣት');
        
        html += `
            <div class="transaction-item ${typeClass}">
                <div class="transaction-info">
                    <span class="transaction-type">${typeText}</span>
                    <span class="transaction-date">${transaction.date}</span>
                </div>
                <span class="transaction-amount">${sign}${transaction.amount.toFixed(2)} ETB</span>
            </div>
        `;
    });
    
    transactionList.innerHTML = html;
}

// Open deposit modal
function openDepositModal() {
    document.getElementById('depositModal').style.display = 'block';
    document.getElementById('depositAmount').value = '';
}

// Close deposit modal
function closeDepositModal() {
    document.getElementById('depositModal').style.display = 'none';
}

// Open withdraw modal
function openWithdrawModal() {
    document.getElementById('withdrawModal').style.display = 'block';
    document.getElementById('withdrawAmount').value = '';
    updateBalanceDisplay();
}

// Close withdraw modal
function closeWithdrawModal() {
    document.getElementById('withdrawModal').style.display = 'none';
}

// Process deposit
function processDeposit() {
    const amountInput = document.getElementById('depositAmount');
    const amount = parseFloat(amountInput.value);
    
    if (!amount || amount <= 0) {
        alert(translations[currentLanguage].invalidAmount);
        return;
    }
    
    // Add to balance
    walletBalance += amount;
    
    // Record transaction
    const transaction = {
        type: 'deposit',
        amount: amount,
        date: new Date().toLocaleString(),
        timestamp: Date.now()
    };
    transactions.push(transaction);
    
    // Save and update
    saveWalletData();
    updateDisplay();
    
    // Close modal and show success
    closeDepositModal();
    alert(translations[currentLanguage].depositSuccess);
}

// Process withdrawal
function processWithdraw() {
    const amountInput = document.getElementById('withdrawAmount');
    const amount = parseFloat(amountInput.value);
    
    if (!amount || amount <= 0) {
        alert(translations[currentLanguage].invalidAmount);
        return;
    }
    
    if (amount > walletBalance) {
        alert(translations[currentLanguage].insufficientFunds);
        return;
    }
    
    // Subtract from balance
    walletBalance -= amount;
    
    // Record transaction
    const transaction = {
        type: 'withdraw',
        amount: amount,
        date: new Date().toLocaleString(),
        timestamp: Date.now()
    };
    transactions.push(transaction);
    
    // Save and update
    saveWalletData();
    updateDisplay();
    
    // Close modal and show success
    closeWithdrawModal();
    alert(translations[currentLanguage].withdrawSuccess);
}

// QR Modal functions
function showModal() {
    document.getElementById('qrModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('qrModal').style.display = 'none';
}

// Language management
function setupLanguageSelector() {
    const languageSelect = document.getElementById('languageSelect');
    
    // Load saved language
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        languageSelect.value = savedLanguage;
    }
    
    languageSelect.addEventListener('change', function() {
        currentLanguage = this.value;
        localStorage.setItem('language', currentLanguage);
        updateLanguage();
    });
}

// Update UI text based on selected language
function updateLanguage() {
    const lang = translations[currentLanguage];
    
    // Update all text elements
    document.getElementById('walletTitle').textContent = lang.walletTitle;
    document.getElementById('balanceLabel').textContent = lang.balanceLabel;
    document.getElementById('depositBtnText').textContent = lang.depositBtnText;
    document.getElementById('withdrawBtnText').textContent = lang.withdrawBtnText;
    document.getElementById('historyTitle').textContent = lang.historyTitle;
    document.getElementById('depositModalTitle').textContent = lang.depositModalTitle;
    document.getElementById('depositAmountLabel').textContent = lang.depositAmountLabel;
    document.getElementById('depositSubmitText').textContent = lang.depositSubmitText;
    document.getElementById('withdrawModalTitle').textContent = lang.withdrawModalTitle;
    document.getElementById('withdrawAmountLabel').textContent = lang.withdrawAmountLabel;
    document.getElementById('withdrawSubmitText').textContent = lang.withdrawSubmitText;
    
    // Update transaction history to reflect language
    updateTransactionHistory();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const depositModal = document.getElementById('depositModal');
    const withdrawModal = document.getElementById('withdrawModal');
    const qrModal = document.getElementById('qrModal');
    
    if (event.target === depositModal) {
        closeDepositModal();
    } else if (event.target === withdrawModal) {
        closeWithdrawModal();
    } else if (event.target === qrModal) {
        closeModal();
    }
}
