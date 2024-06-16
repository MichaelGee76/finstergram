export const sendResponse = (res, result) => {
    res.status(200).json({ result });
};
