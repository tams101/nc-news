import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { addNewTopic, postArticle } from "../../../utils/api";

export default function AddArticle({ topics, setTopics }) {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [addTopic, setAddTopic] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [topicDesc, setTopicDesc] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [content, setContent] = useState("");

  const [posted, setPosted] = useState(false);
  const [error, setError] = useState(null);
  const [topicExists, setTopicExists] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidContent, setInvalidContent] = useState(false);

  const {
    loggedInUser: { username },
  } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setPosted(true);

    if (newTopic && topicDesc) {
      addNewTopic(newTopic, topicDesc)
        .then(() => {
          setTopics((currTopics) => {
            return [...currTopics, { slug: newTopic, description: topicDesc }];
          });
          postArticle(title, newTopic, username, content, imageURL)
            .then(() => {
              setError(null);
              setTitle("");
              setTopic("");
              setNewTopic("");
              setTopicDesc("");
              setImageURL("");
              setContent("");
              setAddTopic(false);
            })
            .catch((err) => {
              setPosted(false);
              setError(
                "There was a problem posting your article. Please try again."
              );
            });
        })
        .catch((err) => {
          setError(
            "There was a problem adding a new topic and posting your article. Please try again."
          );
          setTopics((currTopics) => {
            currTopics.filter((topic) => topic.slug !== newTopic);
          });
        });
    } else {
      postArticle(title, topic, username, content, imageURL)
        .then(() => {
          setError(null);
          setTitle("");
          setTopic("");
          setNewTopic("");
          setTopicDesc("");
          setImageURL("");
          setContent("");
          setAddTopic(false);
        })
        .catch((err) => {
          setPosted(false);
          setError(
            "There was a problem posting your article. Please try again."
          );
        });
    }

    setTimeout(() => {
      setPosted(false);
    }, 5000);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleTopicChange(e) {
    setTopic(e.target.value);
  }

  function handleNewTopic(e) {
    setNewTopic(e.target.value);
    if (
      topics.some(
        (topic) =>
          topic.slug === e.target.value ||
          topic.slug === e.target.value.toLowerCase()
      )
    ) {
      setTopicExists(true);
    } else {
      setTopicExists(false);
    }
  }

  function handleTopicDescChange(e) {
    setTopicDesc(e.target.value);
  }

  function handleImgURLChange(e) {
    setImageURL(e.target.value);
  }

  function handleArticleContentChange(e) {
    setContent(e.target.value);
  }

  function checkValidInput(e) {
    if (e.target.id === "article-title") {
      if (e.target.value.length < 10) {
        setInvalidTitle(true);
      } else {
        setInvalidTitle(false);
      }
    }

    if (e.target.id === "article-content") {
      const words = e.target.value.split(" ");
      if (words.length < 150) {
        setInvalidContent(true);
      } else {
        setInvalidContent(false);
      }
    }
  }

  if (error) return <p>{error}.</p>;
  if (posted)
    return (
      <h3 id="posted-confirmation">Your article was successfully added!</h3>
    );

  return (
    <article className="article-form-container">
      <form className="article-form" onSubmit={handleSubmit}>
        <h2>Create your article</h2>
        <p>*All fields are required</p>
        <label htmlFor="article-title">Title*</label>
        <input
          id="article-title"
          value={title}
          onChange={handleTitleChange}
          onBlur={checkValidInput}
          required
        ></input>
        {invalidTitle && (
          <p className="error">Title must be longer than 10 characters</p>
        )}

        {!addTopic ? (
          <>
            <label htmlFor="article-topic">Choose an existing topic</label>
            <select id="article-topic" onChange={handleTopicChange} required>
              <option value="">-Select a topic-</option>
              {topics.map((topic) => {
                return (
                  <option key={topic.slug} value={topic.slug}>
                    {topic.slug}
                  </option>
                );
              })}
            </select>
          </>
        ) : null}

        {addTopic ? (
          <>
            <label htmlFor="new-topic-name">Topic Name*</label>
            <input
              id="new-topic-name"
              value={newTopic}
              onChange={handleNewTopic}
              required
            ></input>
            {topicExists && <p className="error">This topic already exists!</p>}
            <label htmlFor="new-topic-description">Topic Description*</label>
            <input
              id="new-topic-description"
              value={topicDesc}
              onChange={handleTopicDescChange}
              required
            ></input>
          </>
        ) : (
          <button
            id="add-topic-btn"
            onClick={() => {
              setAddTopic(!addTopic);
            }}
          >
            or add a new topic
          </button>
        )}

        <label htmlFor="article-img-url">Image URL*</label>
        <input
          id="article-img-url"
          type="url"
          value={imageURL}
          onChange={handleImgURLChange}
          required
        ></input>

        <label htmlFor="article-content">Your article*</label>
        <p id="article-word-count">Minimum word count: 150</p>
        <textarea
          id="article-content"
          value={content}
          onChange={handleArticleContentChange}
          onBlur={checkValidInput}
          required
        ></textarea>
        {invalidContent && (
          <p className="error">Your article must be at least 150 words</p>
        )}
        <button id="post-article-btn" disabled={topicExists}>
          Post article
        </button>
      </form>
    </article>
  );
}
