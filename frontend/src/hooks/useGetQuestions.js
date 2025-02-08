const { useEffect } = require('react');

const useGetQuestions = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10')
      .then((response) => response.json())
      .then((data) => setQuestions(data.results));
  }, []);

  return questions;
};
