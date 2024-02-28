const { default: mongoose, models, Schema } = require("mongoose");
const { coursesCard } = require("./dummyData");

const courseSchema = new Schema({
  cover: { type: String, required: true },
  courseName: { type: String, required: true },
  totalTime: { type: String, required: true },
  isFree: { type: Boolean, required: true, default: true },
  credits: { type: Number, required: true, default: 0 },
  skills: [{ type: String, required: true }],
});

const Course = models.Course || mongoose.model("Course", courseSchema);

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://charuhasreddybalam:WOskkEspAWJP29u1@cluster0.huevo1g.mongodb.net/lms"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

const seed = async () => {
  try {
    await connect();
    await Course.insertMany(coursesCard);
    console.log("Seeded the courses");
  } catch (e) {
    console.log(e);
  }
};

seed();
