export const getUser = async (email) => {
  try {
    const userRes = await fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (userRes.ok) {
      const { user } = await userRes.json();
      console.log("User:", user);
      return user;
    }
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
};
