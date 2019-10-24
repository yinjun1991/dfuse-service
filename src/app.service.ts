import { Injectable } from '@nestjs/common';
import { DfuseClient, DfuseClientOptions, createDfuseClient } from '@dfuse/client';
import { SearchTransactionsRequest } from './dto/SearchTransactionsRequest';

@Injectable()
export class AppService {
  private client: DfuseClient;

  constructor() {
    this.client = createDfuseClient({
      apiKey: process.env.DFUSE_KEY,
      network: process.env.EOS_NETWORK
    })
  }

  init(options: DfuseClientOptions) {
    this.client = createDfuseClient(options)
  }

  async getHistory(account: string, query: SearchTransactionsRequest) {
    const condition = `account:eosio.token receiver:eosio.token action:transfer (data.from:${account} OR data.to:${account}) status:executed`

    if (this.client == null) {
      throw Error("client not init")
    }
    return this.client.searchTransactions(condition, query);
  }

  async getGraphHistory(account: string, from: number, to: number, cursor: string) {
    if (this.client == null) {
      throw Error("client not init")
    }

    const graph_sql = `
    query {
      searchTransactionsForward(query: "account:eosio.token receiver:eosio.token action:transfer (data.from:${account} OR data.to:${account}) status:executed", lowBlockNum: ${from}, highBlockNum: ${to}, limit: 100) {
        results {
          undo
          isIrreversible
          trace {
            id
            status
            block {
              id
              num
            }
            matchingActions {
              executionIndex
              account
              name
              data
              seq
            }
          }
        }
      }
    }
    `

    const res = await this.client.graphql(graph_sql)
    return res.data.searchTransactionsForward.results
  }
}
