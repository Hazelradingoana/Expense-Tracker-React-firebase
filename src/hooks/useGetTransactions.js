import { useEffect, useState } from "react";
import { query,collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";


export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionTotal,setTransactionTotal] = useState({balance: 0.0, income: 0.0, expenses: 0.0});


    const transactionsCollectionRef = collection(db, 'transactions');

    const { userID } = useGetUserInfo();
    
    const getTransactions = async () => {

        let unSubscribe;
        try {

            const queryTransaction = query(transactionsCollectionRef, where('userID', '==', userID));
            orderBy('createdAt', 'desc');

            unSubscribe =  onSnapshot(queryTransaction, (snapshot) => {
                let docs = [];
                let totalIncome = 0;
                let totalExpenses = 0;


                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({ ...data, id });

                    if (data.transactionType === 'income') {
                        totalIncome += Number(data.transactionalAmount);
                    } else {
                        totalExpenses += Number(data.transactionalAmount);
                    }

                    console.log(totalExpenses,totalIncome);

                }); 

                setTransactions(docs);


                setTransactionTotal({
                    balance: totalIncome - totalExpenses,
                    income: totalIncome,
                    expenses: totalExpenses
                });
            });

        } catch (error) {
            console.log(error);
        }

        return () => {
            unSubscribe();
        };

    };

    useEffect(() => {
        getTransactions();
    }, []);
    return {transactions,transactionTotal};
};