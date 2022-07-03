const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { GOOGLE_DRIVE_FOLDER_ID } = process.env;

const buildGoogleDriveImageUrl = (id) => `https://drive.google.com/uc?id=${id}`;

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `./keys/gomujul-service-account.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};

const deleteLocalFile = (filePath) => {
  fs.unlink(filePath, () => {
    console.log("file deleted");
  });
};

const makeImageFolder = () => {
  const rootDirectory = path.dirname(require.main.filename);
  const imageFolderPath = path.join(rootDirectory, 'image-files');
  if (!fs.existsSync(imageFolderPath)) {
    fs.mkdirSync(imageFolderPath);
  }
}

const uploadToGoogleDrive = async (file, auth, filename) => {
  const fileMetadata = {
    name: filename,
    parents: [GOOGLE_DRIVE_FOLDER_ID],
  };
  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };
  const driveService = google.drive({ version: "v3", auth });
  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  const url = buildGoogleDriveImageUrl(response.data.id);
  return url;
};

module.exports = { authenticateGoogle, uploadToGoogleDrive, deleteLocalFile, makeImageFolder };