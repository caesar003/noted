# Noted

# Note Manager CLI

A simple command-line interface (CLI) application for managing notes and tags, written in Node.js. This program allows users to create, update, delete, and view notes while associating tags with them. The notes are stored locally in JSON files, and tags can be created and managed as well.

## Features

- **Create Notes**: Add a new note with a title, content, and tags.
- **Update Notes**: Modify an existing note by updating its title, content, and tags.
- **Delete Notes**: Remove a note by its ID prefix.
- **List Notes**: View all the notes in the system.
- **View Note Details**: Check details of a specific note by its ID prefix.
- **Tag Management**: Add and list tags, which can be associated with notes.
- **Version Info**: Display the version of the Note Manager CLI.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/caesar003/noted.git
    ```
2. Navigate to the project directory:

    ```bash
    cd noted
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Make the script executable:

    ```bash
    chmod +x index.js
    ```

5. Optionally, link the CLI globally:
    ```bash
    npm link
    ```

## Usage

To use the Note Manager CLI, run the script with the desired command:

### Create a New Note

```bash
node index.js -a
```

You will be prompted to enter:

- Note Title
- Note Content
- Tags (optional, comma-separated)

### Update an Existing Note

```bash
node index.js -u <idPrefix>
```

You will be prompted to:

- Update the Title (leave blank to keep the current)
- Update the Content (leave blank to keep the current)
- Update Tags (optional, comma-separated, leave blank to keep the current tags)

### Delete a Note

```bash
node index.js -d <idPrefix>
```

This will ask for confirmation before deleting the note.

### List All Notes

```bash
node index.js -l
```

This will display a list of all notes with their IDs and Titles.

### View Note Details

```bash
node index.js -e <idPrefix>
```

This will display the details of a specific note, including the ID, title, content, creation and update dates, and associated tags.

### Display Version Information

```bash
node index.js -v
```

### Help

To view the available commands and options:

```bash
node index.js -h
```

## Tag Management

Tags can be used to categorize notes. You can associate tags with notes when creating or updating them. Tags are managed within the program and stored in the `tags.json` file.

### Available Tag Operations

- **Add Tags**: When creating or updating a note, you can add tags by providing tag names.
- **Tag Validation**: The CLI will ensure that only valid tags (existing ones or new tags) are assigned to notes.

## File Structure

- `index.js`: Main entry point for the application.
- `tags.json`: Stores all tags.
- `notes.json`: Stores all notes.
- `.config/note/`: Configuration directory for storing `notes.json` and `tags.json`.

## Helpers and Utilities

The application includes helper functions for:

- Generating hashes for unique note IDs.
- Slugifying titles for tag management.
- Formatting dates in a user-friendly format.

## Version

This application is currently at version 1.0.0.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
