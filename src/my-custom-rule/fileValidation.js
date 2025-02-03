const fileValidator = function (node) {
  const files = node.value;
  if (!files || !files.length) {
    return "Please upload a file.";
  }

  for (const file of files) {
    if (file.size > 2 * 1024 * 1024) {
      return "File size should not exceed 2 MB.";
    }

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      return "Only PNG and JPEG images are allowed.";
    }
  }
  return true;
};

fileValidator.blocking = false;
fileValidator.skipEmpty = false;

export default fileValidator;
