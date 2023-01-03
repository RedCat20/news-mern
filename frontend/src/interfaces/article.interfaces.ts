export interface IArticle {
    _id: number | string;
    title: string;
    description: string;
    pubDate: Date | string;
    link: string;
    categories: string[] | any[];
    author?: string;
    imageURL?: string;
}

interface ISource {
    id: null | number | string;
    name: string;
}