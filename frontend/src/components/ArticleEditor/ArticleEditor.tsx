import React, {FC, memo, useEffect, useState} from 'react';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

import Layout from "../Layout/Layout";
import styles from "./ArticleEditor.module.scss";

import {fetchUserProfileData, isAuthUser} from "../../redux/slices/authSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";

import {
    useAddNewPostMutation,
    useChangeSelectedPostMutation,
    useGetPostByIdQuery,
    useUploadPostImageMutation
} from "../../redux/api/postsApi";

interface IUploadImageRes {
    data?: any;
    error?: FetchBaseQueryError | SerializedError;
}

interface Props { }

const ArticleEditor:FC<Props> = ({}) => {

    const navigator = useNavigate();
    const isAuth = useAppSelector(isAuthUser);

    const [isAuthAdmin, setIsAuth] = useState(false);

    const dispatch = useAppDispatch();

    const [postId, setPostId] = useState('');

    const { data, isLoading } = useGetPostByIdQuery(postId);

    const [addPostError, setAddPostError] = useState('');

    const [uploadImage, uploadImageResponse] = useUploadPostImageMutation();
    const [addNewPost, addNewPostResponse] = useAddNewPostMutation();
    const [changeSelectedPost, addChangeSelectedPostResponse] = useChangeSelectedPostMutation();

    const [imageUrl, setImageUrl] = useState('');

    const params = useParams();

    const { register, handleSubmit, setError, setValue, formState: {errors, isValid} } = useForm({
        defaultValues: {
            title: '',
            author: '',
            imageURL:  '',
            description: '',
            link: '',
            categories: '',
        },

        mode: 'onSubmit'
    });

    useEffect(() => {
        if (postId && data) {
            setValue( 'title', data?.title);
            setValue( 'author', data?.author);
            setValue( 'description', data?.description);
            setValue( 'link', data?.link);
            setValue( 'categories', data?.categories?.join(', '));
        }
    },[postId, data]);


    useEffect(() => {
        if (params?.id?.length) {
            setPostId(params.id);
        }
    },[params]);

    const onSubmitHandler = async (values: any) => {
        try {
            const formData = new FormData();

            if (values.imageURL) {
                const imageFile = values.imageURL?.[0];
                formData.append('image', imageFile);
            }

            const res: IUploadImageRes = await uploadImage(formData);

            let imgUrl = null;

            if (res && res.data && res.data.url) {
                imgUrl = res.data.url;
            } else if (data?.imageURL) {
                imgUrl = data?.imageURL;
            }

            if (data && postId?.length) {
                await changeSelectedPost({id: postId, post: {...values, imageURL: imgUrl, pubDate: data?.pubDate ?? new Date(Date.now()).toString()} });
                return;
            }

            await addNewPost({...values, imageURL: imgUrl, pubDate: new Date(Date.now()).toString()});
        } catch (err) {
            setAddPostError('Can not add product')
            console.log('Can not add post', err);
        } finally {
            navigator(`/`);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token') && isAuth) {
            setIsAuth(true);
            dispatch(fetchUserProfileData());
        }
    },[isAuth]);

    if (!localStorage.getItem('token') && !isAuthAdmin) {
        return <Navigate to="/auth"/>
    }

    return (
        <Layout>
            <h1>Add article</h1>

              <form method="post" onSubmit={handleSubmit(onSubmitHandler)}>

                <div className={styles.item}>
                  <label>
                    <div className={styles.labelText}>
                      Title*:
                    </div>
                    <input
                        type="text"
                           className={styles.title}
                           {...register('title', {required: 'Please, enter title'})}
                    />
                  </label>
                </div>

                <div className={styles.item}>
                  <div className={styles.labelText}>
                    Post image:
                  </div>
                    <div style={{display: 'flex', gap: '30px', alignItems: 'center'}}>
                        <label className={`${styles.image}`}>
                        {/*<span>Download</span>*/}
                        <input
                          // className={styles.hidden}
                          type="file"
                          {...register('imageURL')}
                        />
                        </label>
                        <span>{data?.imageURL || imageUrl || 'No last uploaded image'}</span>
                    </div>
                </div>

                <div className={styles.item}>
                  <label className={styles.item}>
                    <div className={styles.labelText}>
                      Post text/description*:
                        <br/><span className={styles.info}>(text or html)</span>
                    </div>
                    <textarea
                      className={styles.description}
                      defaultValue={data?.description}
                      {...register('description', {required: 'Please, enter description'})}
                    />
                  </label>
                </div>

                <div className={styles.item}>
                  <label>
                      <div className={styles.labelText}>
                          Author:
                      </div>
                      <input type="text"
                             defaultValue={data?.author}
                             className={styles.title}
                             {...register('author', {required: 'Please, enter author'})}
                      />
                  </label>
                </div>

                <div className={styles.item}>
                  <label>
                    <div className={styles.labelText}>
                      Link:
                        <br/><span className={styles.info}>(enter link url)</span>
                    </div>
                    <input type="text"
                           defaultValue={data?.link}
                           className={styles.title}
                           {...register('link', {required: false})}
                    />
                  </label>
                </div>

                <div className={styles.item}>
                  <label>
                    <div className={styles.labelText}>
                      Categories:
                        <br/><span className={styles.info}>(enter categories list as strings across ', ')</span>
                    </div>
                    <input
                      className={styles.title}
                      defaultValue={data?.categories}
                      {...register('categories', {required: false})}
                    />
                  </label>
                </div>

                <button className={`${styles.button} ${styles.add}`} type="submit">
                    {postId ? 'Edit post' : 'Add post'}

                </button>

                <div className={styles.error}>
                    {addPostError}
                </div>
              </form>

        </Layout>
    );
};

export default memo(ArticleEditor);