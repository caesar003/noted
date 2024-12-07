#!/usr/bin/env node

import { NoteManager } from "./lib/core/NoteManager";
import { rl } from "./lib/helpers";

const noteManager = new NoteManager();
const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
  case "-a":
    console.log("Creating a new note...");
    noteManager.createNote();
    break;

  case "-u":
    if (!arg) {
      console.log("Please provide the ID of the note you want to update.");
      rl.close();
    } else {
      console.log(`Updating note with ID prefix "${arg}"...`);
      noteManager.updateNote(arg);
    }
    break;

  case "-d":
    noteManager.deleteNote(arg);
    break;

  case "-l":
    console.log("Listing all notes...");
    noteManager.listNotes();

    rl.close();
    break;

  case "-e":
    noteManager.viewNote(arg);
    rl.close();
    break;

  case "-v":
    noteManager.printVersion();
    rl.close();
    break;

  case "-h": {
    noteManager.printHelp();
    rl.close();
    break;
  }
  default:
    console.log("Invalid command.");
    noteManager.printHelp();
    rl.close();
}

