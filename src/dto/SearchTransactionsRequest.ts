import { SearchSortType } from '@dfuse/client'

export class SearchTransactionsRequest {
    readonly startBlock?: number
    readonly sort?: SearchSortType
    readonly blockCount?: number
    readonly limit?: number
    readonly cursor?: string
    readonly withReversible?: boolean
}
