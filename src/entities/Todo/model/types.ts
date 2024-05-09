
export interface Todo {
    userId: number
    id: number
    title: string
    completed: boolean
}

export type FetchStatus = 'init' | 'loading' | 'success' | 'error'

export interface TodoStateScheme {
    todos?: Todo[]
    status: FetchStatus
}