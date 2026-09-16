export interface Branch {
  city: string;
  cityAr: string;
  address: string;
  addressAr: string;
  phone: string;
  hours: string;
  hoursAr: string;
  isMain?: boolean;
}

export const branches: Branch[] = [
  {
    city: "Riyadh",
    cityAr: "الرياض",
    address: "Al Olaya District, King Fahd Road",
    addressAr: "حي العليا، طريق الملك فهد",
    phone: "+966 50 000 0000",
    hours: "Sun–Thu, 9am–6pm",
    hoursAr: "الأحد–الخميس، ٩ص–٦م",
    isMain: true,
  },
  {
    city: "Jeddah",
    cityAr: "جدة",
    address: "Al Rawdah District, Tahlia Street",
    addressAr: "حي الروضة، شارع التحلية",
    phone: "+966 50 000 0001",
    hours: "Sun–Thu, 9am–6pm",
    hoursAr: "الأحد–الخميس، ٩ص–٦م",
  },
  {
    city: "Dammam",
    cityAr: "الدمام",
    address: "Al Faisaliyah District, King Saud Street",
    addressAr: "حي الفيصلية، شارع الملك سعود",
    phone: "+966 50 000 0002",
    hours: "Sun–Thu, 9am–6pm",
    hoursAr: "الأحد–الخميس، ٩ص–٦م",
  },
  {
    city: "Makkah",
    cityAr: "مكة المكرمة",
    address: "Al Aziziyah District",
    addressAr: "حي العزيزية",
    phone: "+966 50 000 0003",
    hours: "Sat–Thu, 9am–6pm",
    hoursAr: "السبت–الخميس، ٩ص–٦م",
  },
  {
    city: "Madinah",
    cityAr: "المدينة المنورة",
    address: "Al Nakheel District",
    addressAr: "حي النخيل",
    phone: "+966 50 000 0004",
    hours: "Sat–Thu, 9am–6pm",
    hoursAr: "السبت–الخميس، ٩ص–٦م",
  },
  {
    city: "Khobar",
    cityAr: "الخبر",
    address: "Al Aqrabiyah District, Prince Turkey Street",
    addressAr: "حي العقربية، شارع الأمير تركي",
    phone: "+966 50 000 0005",
    hours: "Sun–Thu, 9am–6pm",
    hoursAr: "الأحد–الخميس، ٩ص–٦م",
  },
  {
    city: "Abha",
    cityAr: "أبها",
    address: "Al Sad District",
    addressAr: "حي السد",
    phone: "+966 50 000 0006",
    hours: "Sun–Thu, 9am–5pm",
    hoursAr: "الأحد–الخميس، ٩ص–٥م",
  },
  {
    city: "Tabuk",
    cityAr: "تبوك",
    address: "Al Wurud District",
    addressAr: "حي الورود",
    phone: "+966 50 000 0007",
    hours: "Sun–Thu, 9am–5pm",
    hoursAr: "الأحد–الخميس، ٩ص–٥م",
  },
];
