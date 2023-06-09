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
    // 해당 파일을 찾을 수 있는지 확인
    return SUPPORTED_FORMATS.includes(value.type);
  }
};
