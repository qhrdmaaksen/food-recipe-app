export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/JPEG",
  "image/gif",
  "image/GIF",
  "image/png",
  "image/PNG",
];

export const validateImageType = (value: File) => {
  if (value) {
    return SUPPORTED_FORMATS.includes(value.type);
  }
};
