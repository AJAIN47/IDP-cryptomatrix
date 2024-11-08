import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function LearnPage() {
  const { t } = useTranslation();
  const [comments, setComments] = useState([
    { id: 1, name: "Elon Musk", text: "Great video and very straightforward. I don't see any other perfect time for one to invest in crypto and trade than now." }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const postComment = () => {
    const nextId = comments.length + 1;
    const newCommentEntry = { id: nextId, name: "New User", text: newComment };
    setComments([...comments, newCommentEntry]);
    setNewComment('');
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6 video-section">
          <h6 className="video-title" style={{color: 'gray'}}>{t('CryptoCurrency101')}</h6>
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
  <h6 style={{color: 'gray'}}>{t('CommentSection')}</h6>
  <div className="comment-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
    {comments.map(comment => (
      <div key={comment.id} className="card mb-2"> {/* Each comment is now a card */}
        <div className="card-body d-flex">
          <div className="comment-icon col-1 text-center">
            <span className="icon" style={{ fontSize: '24px' }}>&#128100;</span> {/* Unicode character for person icon */}
          </div>
          <div className="col-11">
            <h6 className="card-title">{comment.name}</h6> {/* Commenter name as card title */}
            <p className="card-text">{comment.text}</p> {/* Comment text as card text */}
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
            <span className="comment-icon" style={{ fontSize: '24px' }}>&#128100;</span> {/* Person icon */}
          </div>
          <div className="col-10">
            <h6>New User</h6>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



      </div>
    </div>
  );
}

export default LearnPage;
