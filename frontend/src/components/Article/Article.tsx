import React, {FC, useEffect, useState} from 'react';
import {IArticle} from "../../interfaces/article.interfaces";
import {convertDateToObject} from "../../helpers/date.helper";

import styles from './Article.module.scss';
import noImage from '../../assets/img/noimage.png';

import {basePath} from "../../paths";
import {useRemovePostByIdMutation} from "../../redux/api/postsApi";
import {useNavigate} from "react-router-dom";
import ButtonPrimary from "../FormItems/ButtonPrimary/ButtonPrimary";


interface Props {
    article: IArticle;
    isAuth: boolean;
}

const Article:FC<Props> = ({article, isAuth}) => {
    const navigator = useNavigate();

    const [date, setDate] = useState<{day: number; month: number; year: number} | null>(null);

    const [deletePost, response] = useRemovePostByIdMutation();

    useEffect(() => {
        if (article) {
            const dateStr = article?.pubDate?.toString();
            const dateObj = convertDateToObject(dateStr);
            setDate(dateObj);
        }
    },[article]);

    const onRemovePostHandler = async (id: number | string) => {
        try {
            await deletePost(id);
            window.location.reload();
            // navigator('/posts');
        } catch (err) {
            console.log('Can not remove product', err);
        }
    }

    return (
        <div className={styles.card}>
            {article &&
              <>

                <div className={styles.top}>
                    <h3>{article.title}</h3>

                    {isAuth &&
                      <div className={styles.actions}>
                        <ButtonPrimary noPadding fullWidth={true} width={100}
                                       onClickHandler={() => navigator(`/add/${article._id}`)}>
                          Edit
                        </ButtonPrimary>
                        <ButtonPrimary noPadding fullWidth={true} width={100} onClickHandler={
                            () => onRemovePostHandler(article._id)}>
                          Remove
                        </ButtonPrimary>
                      </div>
                    }
                </div>

                <div className={styles.author}>
                  Author: {article.author ?? 'Anonymous'}
                </div>

                  {(article.imageURL || article.imageURL === null) &&
                    <img className={styles.outsideImg}
                         src={article.imageURL === null ? noImage : `${basePath}${article.imageURL}`}
                         alt='PostImage'
                    />
                  }

                <div className={styles.description} dangerouslySetInnerHTML={{__html: article.description}}>
                    {/*{article.description}*/}
                </div>

                <div className={styles.info}>
                  <div className={styles.date}>
                    Published date: {date && `${date.day}.${date.month}.${date.year}`}
                  </div>

                  <div className={styles.link}>
                    <span>Source:</span> <br/> {article.link ? <a href={article.link}>{article.link}</a> : '-'}
                  </div>

                  <div className={styles.categories}>
                    <span>Categories:</span>
                    <br/>
                      {article.categories?.[0] === '' && '-'}
                      {article.categories?.map((item, idx) => {
                          if (idx < article.categories.length - 1) return <span key={idx}>{item}, </span>
                          else return <span key={idx}>{item}</span>
                      })}
                  </div>
                </div>

              </>
            }
        </div>
    );
};

export default Article;