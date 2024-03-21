const createURL = (path) => {
  console.log("Path:", path);
  console.log("Origin:", window.location.origin);
  return window.location.origin + path;
};

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
