const createURL = (path) => {
  return window.location.origin + path;
};

// API route to get user details
export const getUser = async (email) => {
  try {
    console.log("Email:", email);
    const res = await fetch(
      new Request(createURL("/api/getUser"), {
        method: "POST",
        body: JSON.stringify({ email }),
      })
    );
    if (res.ok) {
      const { user } = await res.json();
      console.log("User test:", user);
      return user;
    }
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
};

// API route to get activate trial and update user details
export const activateTrial = async (email) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/trial"), {
        method: "POST",
        body: JSON.stringify({ email }),
      })
    );
    if (res.ok) {
      const updatedUser = await res.json();
      console.log(updatedUser);
      return updatedUser;
    } else {
      console.error("Failed to activate trial");
    }
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
};

// API route to get courses
export const getCourses = async () => {
  try {
    const res = await fetch(
      new Request(createURL("/api/getCourses"), {
        method: "GET",
      })
    );

    if (res.ok) {
      const fetchedCourses = await res.json();
      console.log(fetchedCourses.courses);
      console.log(fetchedCourses.courses[0]._id);
      return fetchedCourses.courses;
    } else {
      console.error("Failed to fetch courses");
    }
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
};

// API route to add course to user's enrolled courses
export const addCourse = async (userId, courseId, remainingCredits) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/addCourse"), {
        method: "POST",
        body: JSON.stringify({
          userid: userId,
          courseid: courseId,
          credits: remainingCredits,
        }),
      })
    );
    if (res.ok) {
      const { updatedUser } = await res.json();
      console.log(updatedUser);
      alert("Course added successfully");
      return updatedUser;
    } else {
      // Handle response not OK
      alert("Failed to add course.");
      console.log("Failed to add course to user's enrolled courses");
    }
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
};

// API route to get user's transactions
export const getTransactions = async (email) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/transaction"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
    );

    if (res.ok) {
      const { transaction } = await res.json();
      return transaction;
    } else {
      console.error("Failed to fetch transactions");
    }
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
};
