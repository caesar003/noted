import * as path from "path";
import * as fs from "fs";

import { NoteInterface } from "../types";
import { CONFIG_DIR } from "../constants";

export class Note {
  private filePath: string;
  private notes: NoteInterface[];

  constructor(filePath = "notes.json") {
    this.filePath = path.join(CONFIG_DIR, filePath);
    this.notes = this.load();
  }

  public add(note: NoteInterface): void {
    this.notes.push(note);
    this.save();
  }

  public list(): NoteInterface[] {
    return this.notes;
  }

  public findByIdPrefix(idPrefix: string): NoteInterface | null {
    const matches = this.notes.filter((note) => note.id.startsWith(idPrefix));

    if (!matches.length) {
      console.log("No note found with the given prefix!");
      return null;
    }

    if (matches.length > 1) {
      console.log(
        "Multiple note found with the given prefix, please specify more characters to make the id unique"
      );
      return null;
    }
    return matches[0];
  }

  public update(idPrefix: string, updates: Partial<NoteInterface>): void {
    const note = this.findByIdPrefix(idPrefix);
    if (!note) throw new Error(`Note with ID prefix "${idPrefix}" not found.`);
    Object.assign(note, updates, { updated_at: new Date() });
    this.save();
  }

  public delete(idPrefix: string): void {
    const note = this.findByIdPrefix(idPrefix);
    if (!note) throw new Error(`Note with ID prefix "${idPrefix}" not found.`);
    this.notes = this.notes.filter((n) => n.id !== note.id);
    this.save();
  }

  private load(): NoteInterface[] {
    if (fs.existsSync(this.filePath)) {
      return JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
    }
    return [];
  }

  private save(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.notes, null, 2));
  }
}
