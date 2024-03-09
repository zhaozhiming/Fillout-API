import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FormFilterDto } from './app.dto';
import { questionsFilter } from './app.util';
import { DEFAULT_LIMIT } from './constants';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async formFilter(formId: string, formFilterDto: FormFilterDto) {
    const { filters, ...rest } = formFilterDto;
    let url = `${process.env.FILLOUT_API_ENDPOINT}/v1/api/forms/${formId}/submissions`;
    const queryStr = Object.keys(rest)
      .map((key) => `${key}=${rest[key]}`)
      .join('&');

    const sourceResponse = await fetch(`${url}?${queryStr}`, {
      headers: {
        Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
      },
    });
    const sourceResult = await sourceResponse.json();
    if (!filters) return sourceResult;

    let responseFilters: ResponseFiltersType;
    try {
      responseFilters = JSON.parse(filters);
    } catch (e) {
      throw new HttpException(
        'The JSON format of the filters is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { responses } = sourceResult;
    const resultResponse = { ...sourceResult };
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      const { questions } = response;
      resultResponse.responses[i].questions = questionsFilter(
        questions,
        responseFilters,
      );
    }

    resultResponse.responses = resultResponse.responses.filter(
      (x) => x.questions.length > 0,
    );

    const limit = rest.limit || DEFAULT_LIMIT;
    resultResponse.totalResponses =
      resultResponse.totalResponses <= limit
        ? resultResponse.responses.length
        : resultResponse.totalResponses -
          limit +
          resultResponse.responses.length;
    resultResponse.pageCount = Math.ceil(resultResponse.totalResponses / limit);

    return resultResponse;
  }
}
