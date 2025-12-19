(async () => {
    let provider;
    let signer;
    let contract;

    const contractAddress = "0x8A8ffDd4e7BA19744b7d93c2c404ac941b40e260";
    const contractAbi = [
        {
            "inputs": [{ "internalType": "string", "name": "_message", "type": "string" }],
            "name": "setMessage",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getMessage",
            "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    if (!window.ethereum) {
        alert("Установите MetaMask");
        return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);

    document.getElementById("connectButton").onclick = async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractAbi, signer);

        const address = await signer.getAddress();
        document.getElementById("accountInfo").innerText = address;
    };

    document.getElementById("setMessageButton").onclick = async () => {
        if (!contract) {
            alert("Сначала подключите кошелёк");
            return;
        }
        await contract.setMessage(
            document.getElementById("messageInput").value
        );
        alert("Сообщение установлено!");
    };

    document.getElementById("getMessageButton").onclick = async () => {
        if (!contract) {
            alert("Сначала подключите кошелёк");
            return;
        }
        const message = await contract.getMessage();
        document.getElementById("messageDisplay").innerText = message;
    };
})();
