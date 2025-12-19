// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let provider;
let signer;
let userAddress;
let contract;

// Адрес вашего развернутого контракта (ЗАМЕНИТЕ НА СВОЙ!)
const contractAddress = "0x8A8ffDd4e7BA19744b7d93c2c404ac941b40e260"; // Замените на реальный адрес контракта

// ABI вашего контракта
const contractAbi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "setMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMessage",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Элементы DOM
const connectButton = document.getElementById('connectButton');
const accountInfo = document.getElementById('accountInfo');
const setMessageButton = document.getElementById('setMessageButton');
const getMessageButton = document.getElementById('getMessageButton');
const messageInput = document.getElementById('messageInput');
const messageDisplay = document.getElementById('messageDisplay');

// ===== ФУНКЦИЯ ПОДКЛЮЧЕНИЯ КОШЕЛЬКА =====
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Запрос подключения аккаунтов
            await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            
            // Инициализация провайдера и подписанта
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();
            
            // Получение баланса
            const balance = await provider.getBalance(userAddress);
            const balanceInEther = ethers.utils.formatEther(balance);
            
            // Обновление информации о кошельке
            accountInfo.innerHTML = `
                <p><strong>Кошелек подключен:</strong> ${userAddress}</p>
                <p><strong>Баланс:</strong> ${balanceInEther} ETH</p>
                <p><strong>Баланс в Wei:</strong> ${balance.toString()}</p>
            `;
            
            // Инициализация контракта
            contract = new ethers.Contract(contractAddress, contractAbi, signer);
            
            // Обновление текста кнопки
            connectButton.textContent = "Кошелек подключен";
            connectButton.disabled = true;
            connectButton.style.backgroundColor = "#cccccc";
            
            // Включаем кнопки для работы с контрактом
            setMessageButton.disabled = false;
            getMessageButton.disabled = false;
            
            console.log('Кошелек успешно подключен!');
            
        } catch (error) {
            console.error("Ошибка при подключении:", error);
            accountInfo.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
        }
    } else {
        accountInfo.innerHTML = '<p>Пожалуйста, установите MetaMask или другой Web3 кошелек.</p>';
    }
}
