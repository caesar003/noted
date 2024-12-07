import { Note } from "./Note";
import { Tag } from "./Tag";
import { NoteInterface } from "../types";
import { generateHash, rl, generateTagIds, formatDate } from "../helpers";
import { VERSION } from "../constants";

export class NoteManager {
  private noteInstance: Note;
  private tagInstance: Tag;

  constructor() {
    this.noteInstance = new Note();
    this.tagInstance = new Tag();
  }

  public createNote() {
    rl.question("Enter note title: ", (title: string) => {
      rl.question("Enter note content: ", (content: string) => {
        const tags = this.tagInstance.list();
        if (tags.length > 0) {
          console.log("Available tags:");
          tags.forEach((tag) => console.log(`${tag.name} (${tag.id})`));
        }

        rl.question("Enter tags (comma-separated): ", (tagInputs: string) => {
          try {
            const tagIds = generateTagIds(this.tagInstance, tagInputs);
            const newNote: NoteInterface = {
              id: generateHash(),
              title: title.trim(),
              content: content.trim(),
              tag_ids: tagIds,
              created_at: new Date(),
              updated_at: new Date(),
            };

            this.noteInstance.add(newNote);
            console.log("Note created successfully!");
          } catch (error) {
            console.error("Error creating note:", error);
          } finally {
            rl.close();
          }
        });
      });
    });
  }

  public updateNote(idPrefix: string) {
    const noteToUpdate = this.noteInstance.findByIdPrefix(idPrefix);
    if (!noteToUpdate) {
      console.error(`No note found with ID prefix "${idPrefix}".`);
      rl.close();
      return;
    }

    const {
      title: currentTitle,
      content: currentContent,
      tag_ids: currentTagIds,
    } = noteToUpdate;

    console.log(`Updating Note (ID: ${noteToUpdate.id}):`);
    console.log(`Current Title: "${currentTitle}"`);
    console.log(`Current Content: "${currentContent}"`);
    if (currentTagIds.length > 0) {
      const currentTags = currentTagIds
        .map(
          (id) => this.tagInstance.findById(id)?.name || `Unknown Tag (${id})`
        )
        .join(", ");
      console.log(`Current Tags: ${currentTags}`);
    } else {
      console.log("No tags associated with this note.");
    }

    rl.question(
      "Update Title (leave blank to keep current): ",
      (newTitle: string) => {
        rl.question(
          "Update Content (leave blank to keep current): ",
          (newContent: string) => {
            const tags = this.tagInstance.list();
            if (tags.length > 0) {
              console.log("Available tags:");
              tags.forEach((tag) => console.log(`${tag.name} (${tag.id})`));
            } else {
              console.log("No tags available. You can add new ones.");
            }

            rl.question(
              "Update Tags (comma-separated, leave blank to keep current): ",
              (tagInputs: string) => {
                try {
                  const updatedTags = tagInputs.trim()
                    ? generateTagIds(this.tagInstance, tagInputs)
                    : currentTagIds;

                  const updatedNote: Partial<NoteInterface> = {
                    title: newTitle.trim() || currentTitle,
                    content: newContent.trim() || currentContent,
                    tag_ids: updatedTags,
                    updated_at: new Date(),
                  };

                  this.noteInstance.update(idPrefix, updatedNote);
                  console.log("Note updated successfully!");
                } catch (error) {
                  console.error("Error updating note:", error);
                } finally {
                  rl.close();
                }
              }
            );
          }
        );
      }
    );
  }

  public deleteNote(idPrefix: string) {
    if (!idPrefix) {
      console.log("Please provide the ID of the note you want to delete.");
      rl.close();
      return;
    }
    console.log(`Deleting note with ID prefix "${idPrefix}"...`);
    const noteToDelete = this.noteInstance.findByIdPrefix(idPrefix);

    if (!noteToDelete) {
      console.error(`No note found with ID prefix "${idPrefix}".`);
      rl.close();
      return;
    }

    console.log("Proceed with caution! This could cause permanent data loss.");

    rl.question(
      `Are you sure you want to delete this note (ID: ${noteToDelete.id})? (y/[N]): `,
      (confirmation: string) => {
        if (confirmation.trim().toLowerCase() === "y") {
          try {
            this.noteInstance.delete(idPrefix);
            console.log("Note deleted successfully!");
          } catch (error) {
            console.error("Error deleting note:", error);
          }
        } else {
          console.log("Deletion cancelled.");
        }
        rl.close();
      }
    );
  }

  public listNotes(): void {
    const allNotes = this.noteInstance.list();
    if (allNotes.length === 0) {
      console.log("No notes available.");
    } else {
      allNotes.forEach((note) => {
        console.log(`ID: ${note.id}, Title: ${note.title}`);
      });
    }
  }

  public viewNote(arg: string) {
    const note = this.noteInstance.findByIdPrefix(arg);

    if (!note) return;

    const { id, title, content, created_at, updated_at, tag_ids } = note;
    const tagNames = tag_ids
      .map((id) => this.tagInstance.findById(id)?.name)
      .join(", ");

    console.log(`ID: ${id}`);
    console.log(`Title: ${title}`);
    console.log(`ID: ${content}`);
    console.log(`Created at: ${formatDate(created_at)}`);
    console.log(`Updated at: ${formatDate(updated_at)}`);

    console.log(`Tags: ${tagNames}`);
  }

  public printVersion() {
    console.log(`Noted version ${VERSION}`);
  }

  public printHelp(): void {
    console.log("Usage:");
    console.log("-a         Create a new note");
    console.log("-u <id>    Update a note by ID");
    console.log("-d <id>    Delete a note by ID");
    console.log("-l         List all notes");
    console.log("-e <id>    View note details by ID");
    console.log("-v         Display version information");
  }
}
