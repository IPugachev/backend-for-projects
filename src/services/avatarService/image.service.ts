import { imageProcessor } from "./imageProcessor.ts";

import { prisma } from "../../lib/prisma.ts";
import { ImageType } from "../../generated/prisma/enums.ts";

class ImageService {
    async upload(
        type: ImageType,
        id: number,
        file: Buffer,
    ) {
        const processed =
            await imageProcessor.process(file);
        const data = {
            base64: processed.buffer.toBase64(),
            mimeType: processed.mimeType,
        };
        // if (type === ImageType.AVATAR) {
        //     return prisma.profile.update({
        //         where: {
        //             id: id,
        //         },
        //         data: { ...data, type: ImageType.AVATAR },
        //     });
        // }
        if (type === ImageType.ARTICLE) {
            return prisma.image.create({
                data: {
                    ...data,
                    type: ImageType.ARTICLE,
                    articleId: id,
                },
            });
        }
    }
    async uploadAvatar(userId: number, file: Buffer) {
        const processed =
            await imageProcessor.process(file);

        const profile = await prisma.profile.findUnique({
            where: {
                userId,
            },
            select: {
                id: true,
            },
        });

        if (!profile) {
            throw new Error(
                `Profile not found for userId: ${userId}`,
            );
        }
        const image = await prisma.image.findUnique({
            where: {
                profileId: profile.id,
            },
            select: {
                id: true,
            },
        });
        const data = {
            base64: processed.buffer.toBase64(),
            mimeType: processed.mimeType,
        };
        if (!image) {
            const image = await prisma.image.create({
                data: {
                    ...data,
                    type: ImageType.AVATAR,
                    profileId: profile.id,
                },
                select: {
                    base64: true,
                    mimeType: true,
                    type: true,
                    id: true,
                },
            });
            await prisma.profile.update({
                where: {
                    userId,
                },
                data: {
                    imageId: image.id,
                },
            });
            return image;
        }

        return prisma.image.update({
            where: {
                profileId: profile.id,
            },
            data: { ...data, type: ImageType.AVATAR },
            select: {
                base64: true,
                mimeType: true,
                type: true,
            },
        });
    }
}
export const imageService = new ImageService();
