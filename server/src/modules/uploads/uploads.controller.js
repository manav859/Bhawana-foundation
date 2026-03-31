import { sendResponse } from '../../utils/send-response.js';

export function uploadFile(req, res) {
  sendResponse(res, {
    statusCode: 201,
    data: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
    },
    message: 'File uploaded successfully.',
  });
}