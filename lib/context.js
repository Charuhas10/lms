"use client";

import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    refetch();
  }, []);

  function refetch() {
    const getModels = async () => {
      try {
        const res = await fetch("/api/getLLM", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const models = await res.json();
          setModels(models);
        } else {
          console.log("Error fetching models");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getModels();
  }

  return (
    <UserContext.Provider value={{ models, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
