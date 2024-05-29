import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";


export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { transactions, transactionTotal } = useGetTransactions();
    const { name,profilePhoto, userID } = useGetUserInfo();   
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionalAmount, setTransactionalAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");
    const {balance,income, expense} = transactionTotal;

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
        description, 
        transactionalAmount, 
        transactionType,
    });
    setDescription("");
    setTransactionalAmount("");
    };

    const signUserOut = async () => {
        try {
            localStorage.clear()
            navigate("/");
        await signOut(auth);
        } catch (er) {
            console.error(er);
        }
    };

    return (
        <>
        <div className="expense-tracker">
            <div className="container">
                <h1> {name}'s Expense Tracker</h1>
                <div className="balance">
                    <h3>Your Balance</h3>
                    { balance >= 0 ? (
                        <h2>R{balance}</h2>

                    ) : ( <h2 style={{color: "red"}}>-R{balance}</h2>
                    )};
                </div>
                <div className="summary">
                    <div className="income">
                        <h4> Income</h4>
                        <p>R{income}</p>
                    </div>
                    <div className="expenses">
                        <h4>Expenses</h4>
                        <p>R{expense}</p>
                    </div>
                </div>
                <form className="add-transaction" onSubmit={onSubmit}>
                    <input type="text" placeholder="Description" value={description} required onChange={(e) => setDescription(e.target.value)} />
                    <input type="number" placeholder="Amount" value={description} required onChange={(e) => setTransactionalAmount(e.target.value)} />
                    <input type="radio" id="expense" value="expense" checked= {transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
                    <label htmlFor="expense">Expense</label>
                    <input type="radio" id="income" value="income" checked= {transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
                    <label htmlFor="income">Income</label>

                    <button type="submit">Add Transaction</button>

                </form>
            </div>
            {profilePhoto && (
                <div className="profile"> 
                {" "}
                <img className="profile-photo" src={profilePhoto}></img>
                <button className="sign-out-button" onClick={{signUserOut}}>
                    Sign Out
                </button>

                </div>
            )};

            <div className="transactions">
                <h3>Transactions</h3>
                <ul>
                {transactions.map((transaction) => {
                const { description, transactionalAmount, transactionType } = transaction;
                return (
                <li key={transaction.id}>
                    <h4>{description}</h4>
                    <p>
                    R{transactionalAmount}. {" "}<label style={{color: transactionType === "expense" ? "red" : "green"}}
                    >
                    {" "}
                    {transactionType}{" "}</label>
                    </p>
                </li>
            );
        })};
                    </ul>
                </div>

            </div>
            </>
        );
}
