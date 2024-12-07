import { Tag } from "../core/Tag";
import slugify from "./slugify";

export default function generateTagIds(tag: Tag, tagInputs: string): number[] {
  if (!tagInputs) return [];

  const response: number[] = [];

  // Parse the input
  const tagInputsArray = tagInputs.split(",").map((item) => item.trim());

  tagInputsArray.forEach((input) => {
    if (!isNaN(Number(input))) {
      const tagId = Number(input);
      if (tag.tagIdExists(tagId)) {
        response.push(tagId);
      } else {
        console.error(`Tag ID ${tagId} does not exist. Skipping.`);
      }
    } else {
      const slugName = slugify(input);
      const existingTag = tag.findByName(slugName);
      if (existingTag) {
        response.push(existingTag.id);
      } else {
        const newTag = tag.add(slugName);
        response.push(newTag.id);
      }
    }
  });

  return response;
}
