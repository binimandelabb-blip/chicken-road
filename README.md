# Chicken Road Game - Ethiopian Edition 🐔💰

A browser-based game where you control a chicken crossing a busy road while collecting coins to earn Ethiopian Birr! Now with a complete wallet system, deposit/withdrawal functionality, and earnings dashboard.

## 🎮 Features

### Game Features
- **Chicken Movement**: Use arrow keys to navigate (⬅️➡️⬆️⬇️)
- **Collect Coins**: Each coin is worth 10 ብር (Ethiopian Birr)
- **Avoid Obstacles**: Dodge cars and trucks on the road
- **Progressive Difficulty**: Game gets faster as you play
- **Real-time Tracking**: Monitor your money and distance

### Wallet & Dashboard Features
- **💳 Wallet System**: Persistent balance stored locally
- **💵 Deposit Money**: Add Ethiopian Birr to your wallet
- **💸 Withdraw Funds**: Withdraw your earnings anytime
- **📊 Statistics Dashboard**: Track your performance
  - Total wallet balance
  - Total earnings from gameplay
  - Games played counter
  - Best distance achieved
  - Deposit and withdrawal history
- **📜 Transaction History**: View all your transactions

### Technical Features
- **PWA Ready**: Can be installed as an app
- **Offline Support**: Works without internet
- **LocalStorage**: All data persists between sessions
- **Mobile Friendly**: Responsive design
- **Play Store Ready**: Manifest file included

## 🚀 How to Play

1. **Open the Game**: Launch `index.html` in your browser
2. **Dashboard**: Start at your personal dashboard
3. **Deposit** (Optional): Add money to your wallet
4. **Play Game**: Click "🎮 Play Game" to start
5. **Controls**:
   - ⬅️ Left Arrow: Move left
   - ➡️ Right Arrow: Move right
   - ⬆️ Up Arrow: Move up
   - ⬇️ Down Arrow: Move down
6. **Collect Coins**: Grab coins (💰) worth 10 ብር each
7. **Avoid Traffic**: Don't hit cars or trucks!
8. **Earn & Save**: Money automatically goes to your wallet
9. **Withdraw**: Access your earnings from the dashboard

## 💰 Wallet System

### Deposit
- Click "💵 Deposit" button
- Enter amount in Ethiopian Birr
- Money is added to your wallet balance

### Withdraw
- Click "💸 Withdraw" button
- Enter amount (up to your balance)
- Money is withdrawn from your wallet

### Earnings
- All coins collected during gameplay are automatically added to your wallet
- Track your total earnings in the statistics section

## 📱 Mobile/Play Store Deployment

### PWA Installation
1. Open the game in a mobile browser
2. Tap "Add to Home Screen"
3. The app will install like a native app

### For Play Store (Additional Steps Required)
1. Create app icons (192x192 and 512x512 PNG)
2. Use [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) or [PWABuilder](https://www.pwabuilder.com/) to generate APK
3. Sign the APK with your developer key
4. Upload to Google Play Console

Example using PWABuilder:
```bash
npm install -g @pwabuilder/cli
pwabuilder https://your-game-url.com
```

## 🛠️ Installation

### Simple Browser Play
```bash
# Just open the file
open index.html
```

### Local Web Server
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server

# Then visit http://localhost:8000
```

## 📊 Game Statistics Tracked

- **Wallet Balance**: Your current available money
- **Total Earned**: Lifetime earnings from gameplay
- **Games Played**: Number of games completed
- **Best Distance**: Furthest distance traveled
- **Total Deposits**: Sum of all deposits
- **Total Withdrawals**: Sum of all withdrawals
- **Transaction History**: Last 10 transactions

## 🎯 Tips for Success

- Stay in the center lane to have more escape routes
- Collect coins but prioritize survival
- Watch for truck patterns - they're bigger but slower
- Your earnings are automatically saved to your wallet
- Deposit money to build your initial capital
- Withdraw anytime to use your earnings

## 🌟 Currency

All values are displayed in Ethiopian Birr (ብር):
- Coins: 10 ብር each
- Deposits: Any amount
- Withdrawals: Up to your balance

Enjoy building your fortune! 🎮💰 
