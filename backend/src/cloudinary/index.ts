// Description: 이 파일에는 cloudinary에 이미지를 업로드하는 코드가 포함되어 있습니다.
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import toStream from "buffer-to-stream";
import sharp from "sharp";

// cloudinary 구성 정보(환경 변수)를 가져옵니다.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
});

export const upload = async (
  file: Buffer,
  folder: string
): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  // sharp 라이브러리를 사용하여 이미지를 리사이징함.
  const bufferOfFile = await sharp(file)
    .resize(1870)
    .webp({ quality: 90 })
    .toBuffer();

  return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
          (error: UploadApiErrorResponse, result: UploadApiResponse) => {
              if(error) {
                  return reject(error);
              }
              resolve(result);
          }
      )
      toStream(bufferOfFile).pipe(upload), { resource_type: "auto", folder};
  })
};
