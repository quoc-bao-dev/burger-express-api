import mongoose from 'mongoose';

export async function updateOrderNumber(
    model: mongoose.Model<any>,
    targetId: string,
    newOrderNumber: number
) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Lấy tài liệu cần cập nhật
        const targetDocument = await model.findById(targetId).session(session);
        if (!targetDocument) throw new Error('Document not found');

        const oldOrderNumber = targetDocument.orderNumber;

        // Điều chỉnh các tài liệu khác
        if (newOrderNumber > oldOrderNumber) {
            // Giảm `orderNumber` của các tài liệu nằm giữa `oldOrderNumber` và `newOrderNumber`
            await model.updateMany(
                { orderNumber: { $gt: oldOrderNumber, $lte: newOrderNumber } },
                { $inc: { orderNumber: -1 } },
                { session }
            );
        } else if (newOrderNumber < oldOrderNumber) {
            // Tăng `orderNumber` của các tài liệu nằm giữa `newOrderNumber` và `oldOrderNumber`
            await model.updateMany(
                { orderNumber: { $gte: newOrderNumber, $lt: oldOrderNumber } },
                { $inc: { orderNumber: 1 } },
                { session }
            );
        }
        // Cập nhật tài liệu đích với `newOrderNumber`
        await model.updateOne(
            { _id: targetId },
            { $set: { orderNumber: newOrderNumber } },
            { session }
        );

        // Commit transaction
        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        // Rollback transaction nếu có lỗi
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}

export const updateOrderNumbers = async (model: mongoose.Model<any>) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const documents = await model.find().sort('orderNumber');
        for (let i = 0; i < documents.length; i++) {
            const document = documents[i];
            await model.updateOne(
                { _id: document._id },
                { $set: { orderNumber: i + 1 } },
                { session }
            );
        }

        // Commit transaction
        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        // Rollback transaction nếu có lỗi
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
