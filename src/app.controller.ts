import { Controller, Get, Query, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ParamFormFilter, QueryFormFilter } from './app.validate';

@Controller('form')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/:formId/filteredResponses')
  async formFilter(
    @Param() param: ParamFormFilter,
    @Query() query: QueryFormFilter,
  ) {
    return this.appService.formFilter(param.formId, query);
  }
}
