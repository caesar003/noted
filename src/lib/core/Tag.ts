import * as path from "path";
import * as fs from "fs";

import { CONFIG_DIR,  } from "../constants";
import { TagInterface } from "../types";

export class Tag {
  private filePath: string;
  private tags: TagInterface[];

  constructor(filePath = "tags.json") {
    this.filePath = path.join(CONFIG_DIR, filePath);
    this.tags = this.load();
  }

  public add(tagName: string): TagInterface {
    if (this.tagNameExists(tagName))
      throw new Error(`Tag "${tagName}" already exists.`);
    const newTag: TagInterface = {
      id: this.generateNewId(),
      name: tagName,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.tags.push(newTag);
    this.save();
    return newTag;
  }

  public list(): TagInterface[] {
    return this.tags;
  }

  public delete(id: number): void {
    const index = this.tags.findIndex((tag) => tag.id === id);
    if (index === -1) throw new Error(`Tag ID ${id} not found.`);
    this.tags.splice(index, 1);
    this.save();
  }

  private generateNewId(): number {
    return this.tags.length > 0
      ? Math.max(...this.tags.map((tag) => tag.id)) + 1
      : 1;
  }

  private load(): TagInterface[] {
    if (fs.existsSync(this.filePath)) {
      return JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
    }
    return [];
  }

  private save(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.tags, null, 2));
  }

  public tagNameExists(tagName: string): boolean {
    return !!this.tags.find((tag) => tag.name === tagName);
  }

  public tagIdExists(id: number): boolean {
    return !!this.tags.find((tag) => tag.id === id);
  }

  public findById(id: number): TagInterface | null {
    return this.tags.find((tag) => tag.id === id) || null;
  }

  public findByName(name: string): TagInterface | null {
    return this.tags.find((tag) => tag.name === name) || null;
  }
}
