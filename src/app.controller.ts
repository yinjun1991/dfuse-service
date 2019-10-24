import { Controller, Get, Post, Body, Query, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { DfuseClientOptions } from '@dfuse/client';
import { SearchTransactionsRequest } from './dto/SearchTransactionsRequest';
import { ResWapper } from './dto/ResWapper';
import { Response } from 'express'
import { ErrCode } from './error_code'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('init')
  initClient(@Body() options: DfuseClientOptions, @Res() res: Response) {
    this.appService.init(options)
    res.json(ResWapper.success({
      success: true,
    }))
  }

  @Get('history/:account')
  async getHistory(@Param('account') account: string, @Query() query: SearchTransactionsRequest, @Res() res: Response) {
    try {
      const history = await this.appService.getHistory(account, query)
      res.json(ResWapper.success(history))
    } catch(e) {
      res.json(ResWapper.fail(ErrCode.ERR_NOT_INIT, e.message))
    }
  }

  // 包含 from 和 to 之间的转账交易，最多 100 条
  @Get('history/graphsql/:account')
  async getGraphHistory(@Param('account') account: string, @Query('from') from: number, @Query('to') to: number, @Query('cursor') cursor: string, @Res() res: Response) {
    try {
      const history = await this.appService.getGraphHistory(account, from, to, cursor)
      res.json(ResWapper.success(history))
    } catch(e) {
      res.json(ResWapper.fail(ErrCode.ERR_NOT_INIT, e.message))
    }
  }
}
