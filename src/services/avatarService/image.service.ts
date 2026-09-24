import { imageProcessor } from "./imageProcessor.ts";

import { prisma } from "../../lib/prisma.ts";
import { ImageType } from "../../generated/prisma/enums.ts";

class ImageService {
    async uploadAvatar(id: number, file: Buffer) {
        const processed =
            await imageProcessor.process(file);

        const image = await prisma.image.findUnique({
            where: {
                profileId: id,
            },
        });
        const data = {
            base64: processed.buffer.toBase64(),
            mimeType: processed.mimeType,
        };
        if (!image) {
            return prisma.image.create({
                data: {
                    ...data,
                    type: ImageType.AVATAR,
                    profileId: id,
                    userId: id,
                },
            });
        }

        return prisma.image.update({
            where: {
                profileId: id,
            },
            data: { ...data, type: ImageType.AVATAR },
        });
    }
    async getAvatar(id: number) {
        return prisma.image.findUnique({
            where: {
                profileId: id,
            },
        });
    }
}
export const imageService = new ImageService();
