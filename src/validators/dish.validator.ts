import { body } from 'express-validator';
export const validateCreateDishInput = [
    body('name')
        .isLength({ min: 1, max: 255 })
        .withMessage('Tên món ăn phải từ 1 đến 255 ký tự'),
    body('image').isString().withMessage('Hình ảnh phải là chuỗi'),
    body('description')
        .isLength({ max: 500 })
        .withMessage('Mô tả tối đa 500 ký tự'),
    body('price').isFloat({ min: 0 }).withMessage('Giá không được âm'),
    body('sizes').isArray().withMessage('Sizes phải là mảng'),
    body('sizes.*.size')
        .isIn(['small', 'medium', 'large'])
        .withMessage('Size phải là small, medium hoặc large'),
    body('sizes.*.additionalPrice')
        .isFloat({ min: 0 })
        .withMessage('Additional price phải là số không được âm'),
    body('category')
        .isLength({ min: 1, max: 255 })
        .withMessage('Category phải từ 1 đến 255 ký tự'),
    body('subCategory')
        .isLength({ min: 1, max: 255 })
        .withMessage('Sub category phải từ 1 đến 255 ký tự'),
];

export const validateUpdateDishInput = [
    body('name')
        .optional()
        .isLength({ min: 1, max: 255 })
        .withMessage('Ten phai tu 1 den 255 ky tu'),
    body('image').optional().isString().withMessage('Hinh anh phai la chuoi'),
    body('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Mo ta toi da 500 ky tu'),
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Gia khong duoc am'),
    body('sizes').optional().isArray().withMessage('Sizes phai la mang'),
    body('sizes.*.size')
        .optional()
        .isIn(['small', 'medium', 'large'])
        .withMessage('Size phai la small, medium hoac large'),
    body('sizes.*.additionalPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Additional price phai la so khong duoc am'),
    body('category')
        .optional()
        .isLength({ min: 1, max: 255 })
        .withMessage('Category phai tu 1 den 255 ky tu'),
    body('subCategory')
        .optional()
        .isLength({ min: 1, max: 255 })
        .withMessage('Sub category phai tu 1 den 255 ky tu'),
    body('available')
        .optional()
        .isBoolean()
        .withMessage('Available phai la boolean'),
    body('orderNumber')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Order number phai la so nguyen duong'),
];
