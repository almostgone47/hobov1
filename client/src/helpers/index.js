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
