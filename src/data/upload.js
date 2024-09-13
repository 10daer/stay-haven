import { uploadAll } from './Uploader';

async function performScheduledUpload() {
  console.log('Starting scheduled upload...');
  try {
    await uploadAll();
    console.log('Scheduled upload completed successfully');
  } catch (error) {
    console.error('Error during scheduled upload:', error);
  }
}

const UPLOAD_INTERVAL = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
const lastUploadTime = localStorage.getItem('lastUploadTime');
const currentTime = Date.now();

if (!lastUploadTime || currentTime - parseInt(lastUploadTime) >= UPLOAD_INTERVAL) {
  performScheduledUpload();
  localStorage.setItem('lastUploadTime', currentTime.toString());
}