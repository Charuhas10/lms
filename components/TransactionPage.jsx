"use client";

import { getTransactions } from "@/utils/api";
import { useEffect, useState } from "react";

export default function TransactionPage({ email }) {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const t = await getTransactions(email);
        setTransactions(t);
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    };

    fetchTransaction();
  }, [email]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.courseName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" flex flex-col w-full h-full border p-4 shadow rounded-md">
      <div className="flex justify-between mb-4">
        <h1 className=" text-2xl">TRANSACTIONS</h1>
        <div>
          <input
            className=" border border-black shadow rounded-md px-4 py-2 mr-8"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
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
            {filteredTransactions.map((transaction, index) => (
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
