<<<<<<< HEAD
    const contractAddress = "0x8A8ffDd4e7BA19744b7d93c2c404ac941b40e260"
=======
    const contractAddress = "addr"
>>>>>>> 85d98d13f8b17878a5c36118ae4103df2cb461c0
    const contractAbi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_message",
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

    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    document.getElementById('setMessageButton').onclick = async () => {
        const message = document.getElementById('messageInput').value;
        await contract.setMessage(message);
        alert('Сообщение установлено!');
    };
    document.getElementById('getMessageButton').onclick = async () => {
        const message = await contract.getMessage();
        document.getElementById('messageDisplay').innerText = message;
    };
} else {
    alert('Установите MetaMask или другой кошелёк')
}