module.exports = {
  // Define application configuration
  appRoot: {
    //   env: process.env.NODE_ENV || "development",
    isProd: process.env.NODE_ENV === "production",
    getAdminFolderName: process.env.ADMIN_FOLDER_NAME || "admin",
    getApiFolderName: process.env.API_FOLDER_NAME || "api",
  },
};
