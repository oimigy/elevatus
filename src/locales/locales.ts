import LocalizedStrings from 'react-localization';

const locales = new LocalizedStrings({
    en: {
        home: "Home",
        goToHomePage: "Go to Home page",
        oops: "Oops!",
        sorry: "Sorry, an unexpected error has occurred.",
        notFound: "Not Found",
        searchJobsByTitle: "Search jobs by title",
        noJobsFound: "No jobs found",
        loading: "Loading...",
        description: "Description",
        requirements: "Requirements",
        skills: "Skills",
        summary: "Summary",
        salaryRange: "Salary Range",
        industry: "Industry",
        major: "Major",
        careerLevel: "Career Level",
    },
    ar: {
        home: "الصفحة الرئيسية",
        goToHomePage: "الذهاب إلى الصفحة الرئيسية",
        oops: "عفوا!",
        sorry: "عذرا، حدث خطأ غير متوقع.",
        notFound: "غير موجود",
        searchJobsByTitle: "البحث عن وظائف حسب العنوان",
        noJobsFound: "لم يتم العثور على وظائف",
        loading: "جار التحميل...",
        description: "الوصف",
        requirements: "المتطلبات",
        skills: "المهارات",
        summary: "ملخص",
        salaryRange: "نطاق الراتب",
        industry: "صناعة",
        major: "رئيسي",
        careerLevel: "مستوى الحياة",
    }
});

export default locales;