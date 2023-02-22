import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setisLoading]= useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"))

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);


            }
            else {
                console.log("no accounts found");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);

            throw new Error("No ehtereum object.");
        }
    }


    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            //get the form data

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208",
                    value: parsedAmount._hex,

                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setisLoading(true);
            console.log(`loading.. ${transactionHash.hash}`);
            await transactionHash.wait();
            setisLoading(false);
            console.log(`Sucess ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionsCount();
            
            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        checkIfWalletIsConnect();
    }, []);



    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, sendTransaction, handleChange }}>
            {children}
        </TransactionContext.Provider>
    );
}