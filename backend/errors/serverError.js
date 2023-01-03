export const handleServerError = (res, err, errMessage) => {
  return res.status(500).json(
    {
      success: 'false',
      message: errMessage
    }
  )
}
