import sharp from "sharp";

class ImageProcessor {
    async process(file: Buffer): Promise<{
        buffer: Buffer;
        mimeType: string;
    }> {
        const processedImage = await sharp(file)
            .resize(96, 96, {
                fit: "cover",
            })
            .webp({
                quality: 80,
            })
            .toBuffer();

        return {
            buffer: processedImage,
            mimeType: "image/webp",
        };
    }
}
export const imageProcessor = new ImageProcessor();
