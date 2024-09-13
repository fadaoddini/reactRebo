// تابع کم کردن تاریخ‌ها و محاسبه زمان باقی‌مانده
const getRemainingTime = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    
    const difference = end - now; // اختلاف زمانی به میلی‌ثانیه
  
    if (difference <= 0) return "زمان پایان یافته است";
  
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
    return `${days} روز ${hours} ساعت ${minutes} دقیقه ${seconds} ثانیه`;
  };
  