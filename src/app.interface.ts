type FilterClauseType = {
  id: string;
  condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
  value: number | string;
};

type QuestionType = {
  id: string;
  name: string;
  type: string;
  value: string;
};

type ResponseFiltersType = FilterClauseType[];
