"use client";

import { useEffect, useState } from "react";

export default function TransactionPage({ email }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await fetch("/api/transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (res.ok) {
          const { transaction } = await res.json();
          console.log("hello", transaction);
          setTransactions(transaction);
        } else {
          console.error("Failed to fetch transactions");
        }
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    };
    getTransactions();
  }, [email]);

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction._id} className="p-4 bg-white shadow rounded-md">
          {/* Display transaction details */}
          <p>{transaction.courseId}</p>
          <p>{transaction.amount}</p>
          {/* Add more transaction details you want to display */}
        </div>
      ))}
    </div>
  );
}
