export interface IMarvelResponse {
    data: {
        offset: number
        limit: number
        total: number
        count: number
        results: IMarvelData
    }
}

export type IMarvelData = IComic[] | IHero[];

export interface IComic {
    title: string
    dates: [{
        type: string
        date: string
    }]
    prices: [{
        type: string
        price: number
    }]
}


export interface IHero {
    id: number
    name: string
    description: string
    thumbnail: {
        path: string
        extension: string
    }
}

export interface IComic {
    title: string
    id: number
    thumbnail: {
        path: string
        extension: string
    }
    dates: [{
        date: string
        type: string
    }]
}
