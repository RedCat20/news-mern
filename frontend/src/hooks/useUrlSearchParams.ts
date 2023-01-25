import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

interface IUrlSearchParams {
    search?: string;
    filter?: string;
}

export const useUrlSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [urlSearchParams, setUrlSearchParams] = useState<IUrlSearchParams>();

    const getUrlSearchParam = (key: string) => {
        return searchParams.get(key);
    }

    useEffect(() => {
        const searchStr = searchParams.get('search') ?? '';
        const filter = searchParams.get('filter')?.split('&').join(', ') ?? '';
        const sort = searchParams.get('sort') ?? 'desc';

        const params = {search: searchStr, filter: filter, sort: sort};

        setSearchParams(params);
        setUrlSearchParams(params);

    },[searchParams])

    return [urlSearchParams, getUrlSearchParam];
}