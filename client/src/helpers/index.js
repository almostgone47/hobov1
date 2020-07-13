import titleize from 'titleize';
import moment from 'moment';

export const rentalType = (isShared) => (isShared ? 'shared' : 'entire');

export const capitalize = (value) => (value ? titleize(value) : '');

export const formatDate = (date, dateFormat = 'YYYY/MM/DD') => {
  if (!date || typeof date !== 'string') {
    return '';
  }

  return moment(date).format(dateFormat);
};

// image cropping for new rental form
export const blobToFile = (blob) => {
  return new File([blob], blob.name, { type: blob.type });
};

export const getCroppedImg = (image, crop, fileName) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );

  // // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');
  // return base64Image;

  // to blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          reject('Canvas is empty');
          return;
        }
        blob.name = fileName;
        const fileUrl = window.URL.createObjectURL(blob);
        blob.url = fileUrl;
        resolve(blob);
      },
      'image/jpeg',
      1
    );
  });
};
