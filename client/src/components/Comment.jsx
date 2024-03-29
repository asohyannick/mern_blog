import React, { useState } from "react";
import moment from "moment";
import { Alert } from "flowbite-react";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import { Textarea, Button} from "flowbite-react";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState([]);
  const [userError, setUserError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setIsEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  React.useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUserError(null);
          setUser(data);
        }
      } catch (error) {
        setUserError(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = async () => {
    setIsEditing(true);
    setIsEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setIsEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-sm">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-x-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="text-gray-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(comment._id)}
                      className="text-gray-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
      {userError && (
        <Alert color="failure" className="mt-5">
          {userError}
        </Alert>
      )}
    </div>
  );
};

export default Comment;
