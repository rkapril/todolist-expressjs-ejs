import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const taskList = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { taskList });
});

app.post("/add", (req, res) => {
  const newTask = req.body.task;

  if (newTask.trim() !== "") {
    taskList.push(newTask);
  }

  res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
  if (req.query._method === "DELETE") {
    const index = parseInt(req.params.index);

    if (index >= 0 && index < taskList.length) {
      // Remove the task at the specified index
      taskList.splice(index, 1);
      res.redirect("/");
    } else {
      res.sendStatus(404); // Send a "Not Found" response if the index is invalid
    }
  } else {
    res.sendStatus(400); // Send a "Bad Request" response if the method is not DELETE
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
