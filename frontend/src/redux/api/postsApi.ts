import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {basePath} from "../../paths";

interface IParams {
    currentPage: number;
    LIMIT: number;
    sort: string | undefined;
    filterQueryStr?: string | undefined;
    searchStr: string | undefined;
}

const createQuery = (params: IParams): {url: string, method: string, headers: {authorization: string}} => {
    console.log('params: ', params);
    const {currentPage, LIMIT, sort, filterQueryStr, searchStr} = params;

    return ({
        url: `posts` +
            `?page=${currentPage + 1}` +
            `&limit=${LIMIT}` +
            `&sort=pubDate,${sort}` +
            `&filter=${filterQueryStr || ''}` +
            `&search=${searchStr}`,
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('token')
        },
    })
}

export const postsApi = createApi({
    reducerPath: 'posts',
    baseQuery: fetchBaseQuery({
        baseUrl: basePath +'/'
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query<any, string>({
            query: (params: any) => { return createQuery(params) },
            providesTags: ['Post'],
        }),
        getPostById: builder.query<any, string>({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'GET',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }),
            providesTags: ['Post'],
        }),

        removePostById: builder.mutation({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }),
            invalidatesTags: ['Post'],
        }),
        uploadPostImage: builder.mutation({
            query: (formData) => ({
                url: `/upload`,
                method: 'POST',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: formData,
            }),
            invalidatesTags: ['Post'],
        }),
        addNewPost: builder.mutation({
            query: (post) => ({
                url: `/posts`,
                method: 'POST',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: post,
            }),
            invalidatesTags: ['Post'],
        }),
        changeSelectedPost: builder.mutation({
            query: ({id, post}) => {
                console.log('query', id, post);
                return ({
                    url: `/posts/${id}`,
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: post
                })
            },
            invalidatesTags: ['Post'],
        }),
    }),
})


export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
    useRemovePostByIdMutation,
    useUploadPostImageMutation,
    useAddNewPostMutation,
    useChangeSelectedPostMutation
} = postsApi