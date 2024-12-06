import { body } from 'express-validator';

export const validateCreateComboInput = [
    body('name')
        .isLength({ min: 1, max: 255 })
        .withMessage('Tên combo phải từ 1 đến 255 ký tự'),
    body('price').isNumeric().withMessage('Giá phải là số'),
    body('image').isString().withMessage('Hình ảnh phải là chuỗi'),
    body('description')
        .isLength({ max: 500 })
        .withMessage('Mô tả tối đa 500 ký tự'),
    body('items').isArray().withMessage('Items phải là mảng'),
    body('items.*.dishId')
        .isLength({ min: 1, max: 255 })
        .withMessage('ID món ăn phải từ 1 đến 255 ký tự'),
    body('items.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Số lượng phải là số nguyên dương'),
    body('items.*.options')
        .isLength({ max: 255 })
        .withMessage('Tùy chọn tối đa 255 ký tự'),
    body('timeRange.timeStart')
        .optional()
        .isISO8601()
        .withMessage('Thời gian bắt đầu phải là chuỗi ISO 8601'),
    body('timeRange.timeEnd')
        .optional()
        .isISO8601()
        .withMessage('Thời gian kết thúc phải là chuỗi ISO 8601'),
    body('promotion')
        .optional()
        .isBoolean()
        .withMessage('Khuyến mãi phải là boolean'),
];

export const validateUpdateComboInput = [
    body('name')
        .optional()
        .isLength({ min: 1, max: 255 })
        .withMessage('Ten combo phai tu 1 den 255 ky tu'),
    body('price')
        .optional()
        .isNumeric()
        .withMessage('Giaban phai la so khong duoc am'),
    body('image').optional().isString().withMessage('Hinh anh phai la chuoi'),
    body('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Mo ta toi da 500 ky tu'),
    body('items').optional().isArray().withMessage('Items phai la mang'),
    body('items.*.dishId')
        .optional()
        .isLength({ min: 1, max: 255 })
        .withMessage('ID monn ăn phai tu 1 den 255 ky tu'),
    body('items.*.quantity')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Soluong phai la so nguyen duong'),
    body('items.*.options')
        .optional()
        .isLength({ max: 255 })
        .withMessage('Tuy chon toi da 255 ky tu'),
    body('timeRange.timeStart')
        .optional()
        .isISO8601()
        .withMessage('Thoi gian bat dau phai la chuoi ISO 8601'),
    body('timeRange.timeEnd')
        .optional()
        .isISO8601()
        .withMessage('Thoi gian ket thuc phai la chuoi ISO 8601'),
    body('isPermanent')
        .optional()
        .isBoolean()
        .withMessage('Khuyen mai phai la boolean'),
    body('orderNumber')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Order number phai la so nguyen duong'),
];
