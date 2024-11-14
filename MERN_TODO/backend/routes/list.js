const router = require("express").Router();
const List = require("../models/list");
const User = require("../models/user");

// Create

router.post("/addTask", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = new List({ email, body, title, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

// Update

router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = await List.findByIdAndUpdate(req.params.id, { title, body }); // This will search the id that we want to update.
      list
        .save()
        .then(() => res.status(200).json({ message: "Task has been Updated" }));
    }
  } catch (error) {
    console.log(error);
  }
});

// Delete

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOneAndUpdate(
      { email },
      { $pull: { list: req.params.id } }
    );
    if (existingUser) {
      const list = await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Task has been Deleted Successfully" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});

// GetTask

router.get("/getTasks/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
  // we have use sort ({createdAt: -1}) so we can sort the task by createdAT and we use -1 so we want all task in decending order means latest added task on top postion.
  if (list.length !== 0) {
    res.status(200).json({ list });
  } else {
    res.status(200).json({ message: "No Tasks" });
  }
});

module.exports = router;
