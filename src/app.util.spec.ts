import { questionsFilter } from './app.util';

describe('AppUtil', () => {
  describe('root', () => {
    it('should return empty result', () => {
      const questions: QuestionType[] = [
        {
          id: 'nameId',
          name: "What's your name?",
          type: 'ShortAnswer',
          value: 'Timmy',
        },
        {
          id: 'birthdayId',
          name: 'What is your birthday?',
          type: 'DatePicker',
          value: '2024-02-22T05:01:47.691Z',
        },
      ];
      const filters: FilterClauseType[] = [
        {
          id: 'nameId',
          condition: 'equals',
          value: 'Timmy',
        },
        {
          id: 'birthdayId',
          condition: 'greater_than',
          value: '2024-02-23T05:01:47.691Z',
        },
      ];
      const result = questionsFilter(questions, filters);
      const expected = [];
      expect(result).toEqual(expected);
    });

    it('should return questions', () => {
      const questions: QuestionType[] = [
        {
          id: 'nameId',
          name: "What's your name?",
          type: 'ShortAnswer',
          value: 'Timmy',
        },
        {
          id: 'birthdayId',
          name: 'What is your birthday?',
          type: 'DatePicker',
          value: '2024-02-22T05:01:47.691Z',
        },
      ];
      const filters: FilterClauseType[] = [
        {
          id: 'nameId',
          condition: 'equals',
          value: 'Timmy',
        },
        {
          id: 'birthdayId',
          condition: 'less_than',
          value: '2024-02-23T05:01:47.691Z',
        },
      ];
      const result = questionsFilter(questions, filters);
      expect(result).toEqual(questions);
    });

    it('should return questions when filter has the attribuite which question do not has', () => {
      const questions: QuestionType[] = [
        {
          id: 'nameId',
          name: "What's your name?",
          type: 'ShortAnswer',
          value: 'Timmy',
        },
        {
          id: 'birthdayId',
          name: 'What is your birthday?',
          type: 'DatePicker',
          value: '2024-02-22T05:01:47.691Z',
        },
      ];
      const filters: FilterClauseType[] = [
        {
          id: 'nameId',
          condition: 'equals',
          value: 'Timmy',
        },
        {
          id: 'birthdayId',
          condition: 'less_than',
          value: '2024-02-23T05:01:47.691Z',
        },
        {
          id: 'ageId',
          condition: 'less_than',
          value: '2024-02-23T05:01:47.691Z',
        },
      ];
      const result = questionsFilter(questions, filters);
      expect(result).toEqual([]);
    });

    it('should return questions when question has the attribuite which filter do not has', () => {
      const questions: QuestionType[] = [
        {
          id: 'nameId',
          name: "What's your name?",
          type: 'ShortAnswer',
          value: 'Timmy',
        },
        {
          id: 'birthdayId',
          name: 'What is your birthday?',
          type: 'DatePicker',
          value: '2024-02-22T05:01:47.691Z',
        },
      ];
      const filters: FilterClauseType[] = [
        {
          id: 'nameId',
          condition: 'equals',
          value: 'Timmy',
        },
      ];
      const result = questionsFilter(questions, filters);
      expect(result).toEqual(questions);
    });

    it('should return questions when filter is empty', () => {
      const questions: QuestionType[] = [
        {
          id: 'nameId',
          name: "What's your name?",
          type: 'ShortAnswer',
          value: 'Timmy',
        },
        {
          id: 'birthdayId',
          name: 'What is your birthday?',
          type: 'DatePicker',
          value: '2024-02-22T05:01:47.691Z',
        },
      ];
      const filters: FilterClauseType[] = [];
      const result = questionsFilter(questions, filters);
      expect(result).toEqual(questions);
    });
  });
});
