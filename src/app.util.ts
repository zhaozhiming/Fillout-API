export const questionsFilter = (
  questions: QuestionType[],
  filters: FilterClauseType[],
): QuestionType[] => {
  const bools = [];
  for (const filter of filters) {
    const question = questions.find((x) => x.id === filter.id);
    if (question) {
      const match = isQuestionMatch1(question, filter);
      bools.push(match);
    } else {
      bools.push(false);
    }
  }
  if (bools.some((x) => x === false)) return [];
  return questions;
};

const isQuestionMatch = (
  question: QuestionType,
  filter: FilterClauseType,
): boolean => {
  if (filter.id !== question.id) return false;

  switch (filter.condition) {
    case 'equals':
      return question.value === filter.value;
    case 'does_not_equal':
      return question.value !== filter.value;
    case 'greater_than':
      return question.value > filter.value;
    case 'less_than':
      return question.value < filter.value;
    default:
      return false;
  }
};

const isQuestionMatch1 = (
  question: QuestionType,
  filter: FilterClauseType,
): boolean => {
  switch (filter.condition) {
    case 'equals':
      return question.value === filter.value;
    case 'does_not_equal':
      return question.value !== filter.value;
    case 'greater_than':
      return question.value > filter.value;
    case 'less_than':
      return question.value < filter.value;
    default:
      return false;
  }
};
