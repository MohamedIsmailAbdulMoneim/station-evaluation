import {
  getAreas,
  getGovernorates,
  getQuestions,
  getStations,
  insertAnswers,
} from '@/lib/apiHandlers/utils';
import StationEvalPage from './StationEvalPage';

const HomePage = async ({ searchParams }) => {
  const questions = await getQuestions();
  const stations = await getStations();
  const areas = await getAreas();
  const governs = await getGovernorates();

  const steps = [
    {
      title: 'توصيف محطة',
      subTitle: 'بيانات محطة',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'بيانات المحطة',
      ),
    },
    {
      title: 'توصيف محطة',
      subTitle: 'موقع المحطة',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'موقع المحطة',
      ),
    },
    {
      title: 'توصيف محطة',
      subTitle: 'الضاغط ونقاط التموين',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'الضاغط ونقاط التموين',
      ),
    },
    {
      title: 'توصيف محطة',
      subTitle: 'عمالة التشغيل',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'عمالة التشغيل',
      ),
    },
    {
      title: 'توصيف محطة',
      subTitle: 'بيانات تسويقية',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'بيانات تسويقية',
      ),
    },
    {
      title: 'تقييم المحطة',
      subTitle: 'مساحة خضراء',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'مساحة خضراء',
      ),
    },
    {
      title: 'تقييم المحطة',
      subTitle: 'المظلة وجزر التموين',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'المظلة وجزر التموين',
      ),
    },
    {
      title: 'تقييم المحطة',
      subTitle: 'حالة وحدات التموين',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'حالة وحدات التموين',
      ),
    },
    {
      title: 'تقييم المحطة',
      subTitle: 'حركة السيارات داخل المحطة',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'حركة السيارات داخل المحطة',
      ),
    },
    {
      title: 'تقييم المحطة',
      subTitle: 'زيوت أسفل المظلة',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'زيوت أسفل المظلة',
      ),
    },
    {
      title: 'تقييم المحطة',
      subTitle: 'مظهر أفراد التشغيل',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'مظهر أفراد التشغيل',
      ),
    },
    {
      title: 'تقييم المحطة',
      subTitle: 'سلوك أفراد التشغيل',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'سلوك أفراد التشغيل',
      ),
    },
    {
      title: 'تقييم المحطة',
      subTitle: 'واجبات أفراد التشغيل',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'واجبات أفراد التشغيل',
      ),
    },
    {
      title: 'تقييم المحطة',
      subTitle: 'منطقة الضاغط',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'منطقة الضاغط',
      ),
    },
    {
      title: 'تقييم المحطة',
      subTitle: 'السلامة والصحة المهنية',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'السلامة والصحة المهنية',
      ),
    },
    {
      title: 'تقييم المحطة',
      subTitle: 'غرفة الملابس والحمام',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'غرفة الملابس والحمام',
      ),
    },
    {
      title: 'تقييم المحطة',
      subTitle: 'تأمين المحطة',
      questions: questions.filter(
        (q) => q.question_sub_sort.trim() === 'تأمين المحطة',
      ),
    },
  ];

  return (
    <>
      <StationEvalPage
        stations={stations}
        areas={areas}
        governs={governs}
        steps={steps}
        insertAnswers={insertAnswers}
      />
    </>
  );
};

export default HomePage;
