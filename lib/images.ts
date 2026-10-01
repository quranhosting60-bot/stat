/**
 * Small (≤560px) WebP copy of a product/category photo for cards, menus and
 * chat thumbnails. Full-size photos are only loaded where they are shown large.
 */
export function thumbOf(photo: string): string {
  return photo.replace(/\/images\/(products|categories)\/([^/]+\.webp)$/, "/images/$1/thumbs/$2");
}
