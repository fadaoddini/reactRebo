import React, { useState, useEffect } from 'react';
import styles from './NumberToWords.module.css'; // وارد کردن استایل‌ها

// تابع تبدیل عدد به حروف فارسی
const numberToPersianWords = (num) => {
  if (num > 999999999999) {
    return 'محاسبه مقدور نمی‌باشد';
  }

  if (num === 0) return 'صفر';

  const ones = [
    '', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'
  ];
  const teens = [
    'ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'
  ];
  const tens = [
    '', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'
  ];
  const hundreds = [
    '', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'
  ];
  const thousands = [
    '', 'هزار', 'میلیون', 'میلیارد'
  ];

  const getChunkInWords = (n) => {
    let chunkWords = '';

    if (Math.floor(n / 100) > 0) {
      chunkWords += hundreds[Math.floor(n / 100)] + ' ';
      n %= 100;
    }

    if (Math.floor(n / 10) > 1) {
      chunkWords += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    }

    if (n > 0) {
      chunkWords += ones[n];
    }

    return chunkWords.trim();
  };

  let words = '';
  let chunkCount = 0;

  while (num > 0) {
    let chunk = num % 1000;
    if (chunk > 0) {
      let chunkWords = getChunkInWords(chunk);
      if (chunkCount > 0) {
        chunkWords += ' ' + thousands[chunkCount];
      }
      if (words) {
        words = chunkWords + ' و ' + words;
      } else {
        words = chunkWords;
      }
    }
    num = Math.floor(num / 1000);
    chunkCount++;
  }

  // حذف " و " اضافی در انتهای متن
  return words.trim().replace(/ و $/, '');
};

// کامپوننت NumberToWords
const NumberToWords = ({ number }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (number !== undefined && number !== null && !isNaN(number) && number !== '') {
      const words = numberToPersianWords(parseInt(number, 10));
      setDisplayText(`${words} ریال`);
    } else {
      setDisplayText('');
    }
  }, [number]);

  return (
    <p className={styles.numberToWords}>
      {displayText}
    </p>
  );
};

export default NumberToWords;
