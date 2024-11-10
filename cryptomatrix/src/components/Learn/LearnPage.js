import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Login from '../Login/Login'; // Make sure the path is correct for your Login component import
import { useAuth } from '../../context/AuthContext'; // Import useAuth from your AuthContext

function LearnPage() {
  const { t } = useTranslation();
  const { user, isLoggedIn } = useAuth(); // Use user and isLoggedIn from AuthContext
  const elonMuskComment = {
    id: 0,
    name: "Elon Musk",
    text: "Great video and very straightforward. I don't see any other perfect time for one to invest in crypto and trade than now."
  };

  const [comments, setComments] = useState(() => {
    const localData = localStorage.getItem('comments');
    return localData ? JSON.parse(localData) : [];
  });
  const [newComment, setNewComment] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const postComment = () => {
    if (!isLoggedIn) {
      setIsPopupOpen(true); // Show login modal if not logged in
      return;
    }
    const nextId = comments.length ? comments.reduce((acc, curr) => Math.max(acc, curr.id), 0) + 1 : 1;
    const newCommentEntry = { id: nextId, name: user.username, text: newComment };
    setComments([...comments, newCommentEntry]);
    setNewComment('');
  };

  const deleteComment = (id) => {
    if (!isLoggedIn) {
      alert(t('Please log in to delete comments'));
      return;
    }
    setComments(comments.filter(comment => comment.id !== id));
  };

  //define username
  let username = '';
  //if user is string
  if (typeof user === 'string') {
      console.log('User is a string in UserPanel', user);
        username = user;
  }
  //if user is object
  else if (user && user.username) {
      console.log('User is an object in UserPanel', user);
        username = user.username;
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6 video-section">
          <h6 className="video-title">{t('CryptoCurrency101')}</h6>
          <iframe
            className="embed-responsive-item rounded"
            style={{ border: '1px solid #ccc' }}
            width="100%" height="315"
            src="https://www.youtube.com/embed/1YyAzVmP9xQ"
            title={t('VideoTitle')}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div className="col-md-6 comment-section">
          <h6>{t('CommentSection')}</h6>
          <div className="comment-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <div className="card mb-2">
              <div className="card-body d-flex">
                <div className="comment-icon col-1 text-center">&#128100;</div>
                <div className="col-10">
                  <h6 className="card-title asd">{elonMuskComment.name}</h6>
                  <p className="card-text">{elonMuskComment.text}</p>
                </div>
              </div>
            </div>
            {comments.map(comment => (
              <div key={comment.id} className="card mb-2">
                <div className="card-body d-flex">
                  <div className="comment-icon col-1 text-center">&#128100;</div>
                  <div className="col-10">
                    <h6 className="card-title asd">{comment.name}{username}</h6>
                    <p className="card-text">{comment.text}</p>
                    {isLoggedIn && user.username === comment.name && (
                      <button className="btn btn-danger btn-sm" onClick={() => deleteComment(comment.id)}>
                        {t('Delete')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="new-comment mt-3">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-2 text-center">
                    <span className="comment-icon" style={{ fontSize: '24px' }}>&#128100;</span>
                  </div>
                  <div className="col-10">
                    {isLoggedIn ? (
                      <>
                        <h6>{user.username}</h6>
                        <textarea
                          value={newComment}
                          onChange={handleCommentChange}
                          placeholder={t('WriteComment')}
                          rows="2"
                          className="form-control mb-2"
                        ></textarea>
                        <button onClick={postComment} className="btn btn-primary">
                          {t('PostComment')}
                        </button>
                      </>
                    ) : (
                      <button onClick={() => setIsPopupOpen(true)} className="btn btn-primary">
                        {t('LoginToComment')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <Login isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}<br />
    </div>
  );
}

export default LearnPage;
