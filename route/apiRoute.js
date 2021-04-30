//DEPENENCIES
const fs = require("fs");
const path = require("path");

//ROUTING
module.exports = (app) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    let notes = JSON.parse(data);

    //ROUTE
    app.get("/api/notes", function (req, res) {
      res.json(notes);
    });
    app.post("/api/notes", function (req, res) {
      let newNotes = req.body;
      notes.push(newNotes);
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
      return console.log(`Created new note: ${newNotes.title}`);
    });

    app.get("/api/notes/:id", function (req, res) {
      res.json(notes[req.params.id]);
    });
    app.delete("/api/notes/:id", function (req, res) {
    let noteID = req.params.id;
      notes.splice(noteID, 1);
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
      console.log("Successfully Deleted Note: Refresh page!");
    });

    //RENDER ON HTML
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  });
};
