import React, { useState, useEffect } from 'react';
import NewsArticleCard from './NewsArticleCard';
import dbAPI from '../../modules/dbAPI';
import { Button } from "semantic-ui-react";
import './NewsArticle.css';
import NewsArticleModal from './NewsArticleModal';

const NewsArticleList = (props) => {
    const activeUserId = parseInt(sessionStorage.getItem("userId"));

    const [newsArticles, setNewsArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [synopsisError, setSynopsisError] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false, () => formIsValid);

    const [values, setValues] = useState({
        userId: activeUserId,
        title: "",
        url: "",
        synopsis: "",
        created_at: new Date()
    });

    const getNewsArticles = () => {
        return dbAPI.getObjectByResource("newsArticles", activeUserId).then(newsFromAPI => {
            const sortedNewsFromAPI = newsFromAPI.sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at)
            })
            setNewsArticles(sortedNewsFromAPI)
        })
    };

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    const handleFormSubmit = () => {
        if (values.title !== "" && values.url !== "" && values.synopsis !== "") {
            setFormIsValid(true);
            if (!isEditing) {
                dbAPI.postObjectByResource("newsArticles", values)
                    .then(() => {
                        getNewsArticles();
                        toggleModal();
                        setValues({
                            userId: activeUserId,
                            title: "",
                            url: "",
                            synopsis: "",
                            created_at: new Date()
                        });
                    });
            } else if (isEditing) {
                dbAPI.putObjectByResource("newsArticles", values).then(() => {
                    getNewsArticles();
                    toggleModal();
                    setIsEditing(false);
                    setValues({
                        userId: activeUserId,
                        title: "",
                        url: "",
                        synopsis: "",
                        created_at: new Date()
                    });
                });
            }
        } else {
            if (values.title === "") {
                setFormIsValid(false);
                setTitleError({
                    content: "Please enter a title",
                    pointing: "below"
                });
            }

            if (values.url === "") {
                setFormIsValid(false);
                setUrlError({
                    content: "Please enter a URL",
                    pointing: "below"
                });
            }

            if (values.synopsis === "") {
                setFormIsValid(false);
                setSynopsisError({
                    content: "Please enter a synopsis",
                    pointing: "below"
                });
            }
        }
    };

    const handleFieldChange = evt => {
        const changeValue = { ...values };
        const fieldId = evt.target.id;
        const fieldValue = evt.target.value;
        changeValue[fieldId] = fieldValue;
        if (fieldId === "title") {
            if (fieldValue.length >= 1) {
                setTitleError(false);
            }
        } else if (fieldId === "url") {
            if (fieldValue.length >= 1) {
                setUrlError(false);
            }
        } else if (fieldId === "synopsis") {
            if (fieldValue.length >= 1) {
                setSynopsisError(false);
            }
        }
        setValues(changeValue);
    };

    const cancelNewsArticle = () => {
        setValues({
            userId: activeUserId,
            title: "",
            url: "",
            synopsis: "",
            created_at: new Date()
        });
        setIsEditing(false)
        toggleModal();
    };

    const handleEditNewsArticle = (id) => {
        setIsLoading(true);
        setIsEditing(true);
        toggleModal();
        dbAPI.fetchObjectById("newsArticles", id).then((values) => {
            setValues({
                id: values.id,
                userId: activeUserId,
                title: values.title,
                url: values.url,
                synopsis: values.synopsis,
                created_at: new Date()
            })
            setIsLoading(false);
        });
    };

    const handleDeleteNewsArticle = (id) => {
        setIsLoading(true);
        dbAPI.deleteObjectByResource("newsArticles", id)
            .then(() => dbAPI.getObjectByResource("newsArticles", activeUserId).then(newsFromAPI => {
                const sortedNewsFromAPI = newsFromAPI.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at)
                })
                setNewsArticles(sortedNewsFromAPI)
                setIsLoading(false);
            }))

    }

    useEffect(() => {
        getNewsArticles();
    }, []);

    if (newsArticles.length === 0) {
        return (
            <>
                <section className="news-content-container">
                    <div className="add-news-button-container">
                        <Button
                            onClick={toggleModal}
                        >Add News Article</Button>
                    </div>
                    <div className="news-modal-container">
                        <NewsArticleModal
                            modalIsOpen={modalIsOpen}
                            updateNewsArticles={handleFormSubmit}
                            isEditing={isEditing}
                            titleError={titleError}
                            urlError={urlError}
                            synopsisError={synopsisError}
                            handleFieldChange={handleFieldChange}
                            values={values}
                            cancelNewsArticle={cancelNewsArticle}
                            isLoading={isLoading}
                            setIsEditing={setIsEditing}
                        />
                    </div>
                    <div className="no-news-message-container">
                        <h1 className="no-news-message">You have no saved news articles.</h1>
                    </div>
                </section>
            </>
        )
    } else {
        return (
            <>
                <section className="news-content-container">
                    <div className="add-news-button-container">
                        <Button
                            onClick={toggleModal}
                        >Add News Article</Button>
                    </div>
                    <div className="news-modal-container">
                        <NewsArticleModal
                            modalIsOpen={modalIsOpen}
                            updateNewsArticles={handleFormSubmit}
                            isEditing={isEditing}
                            titleError={titleError}
                            urlError={urlError}
                            synopsisError={synopsisError}
                            handleFieldChange={handleFieldChange}
                            values={values}
                            cancelNewsArticle={cancelNewsArticle}
                            isLoading={isLoading}
                            setIsEditing={setIsEditing}
                        />
                    </div>
                    <div className="news-cards-container">
                        {newsArticles.map(newsArticle =>
                            <NewsArticleCard
                                key={newsArticle.id}
                                newsArticle={newsArticle}
                                handleDeleteNewsArticle={handleDeleteNewsArticle}
                                handleEditNewsArticle={handleEditNewsArticle}
                                disabled={isLoading}
                                {...props}
                            />)}
                    </div>
                </section>
            </>
        )
    }
}

export default NewsArticleList;






