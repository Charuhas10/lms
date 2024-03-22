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

  console.log(transactions);

  return (
    <div className=" flex flex-col w-full h-full border p-4 shadow rounded-md">
      <div className="flex justify-between mb-4">
        <h1 className=" text-2xl">TRANSACTIONS</h1>
        <div>
          <input
            className=" border border-black shadow rounded-md px-4 py-2 mr-8"
            type="text"
            placeholder="Search.."
          ></input>
          <button className=" bg-blue-500 rounded-md border border-black py-2 px-4">
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                SNo.
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Course Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {index + 1}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {transaction.courseName}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {transaction.amount}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {transaction.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// <div className="space-y-4">
//   {transactions.map((transaction) => (
//     <div key={transaction._id} className="p-4 bg-white shadow rounded-md">
//       {/* Display transaction details */}
//       <p>{transaction.courseId}</p>
//       <p>{transaction.amount}</p>
//       {/* Add more transaction details you want to display */}
//     </div>
//   ))}
// </div>
