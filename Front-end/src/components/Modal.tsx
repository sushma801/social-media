import React, { useState } from "react";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { IoCloseCircle } from "react-icons/io5";
import { BsCloudUploadFill } from "react-icons/bs";
import { gql, useLazyQuery } from "@apollo/client";

interface IModal {
  open: boolean;
  handleClose: () => void;
  handleConfirmPost: (value: string) => void;
}

const Modal = ({ open, handleClose, handleConfirmPost }: IModal) => {
  const [postDetails, setPostDetails] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showUserList, setShowUserList] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [fetchUsers, { data: userData }] = useLazyQuery(FETCH_USERS);

  const handlePostChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart;
    setPostDetails(value);

    // Detect "@" and show dropdown
    const beforeCursor = value.slice(0, cursorPos);
    const lastWord = beforeCursor.split(" ").pop();

    if (lastWord?.startsWith("@")) {
      setShowUserList(true);
      setSearchTerm(lastWord.slice(1)); // Fetch after "@"
      fetchUsers({ variables: { searchTerm: lastWord.slice(1) } });
    } else {
      setShowUserList(false);
    }
    setCursorPosition(cursorPos);
  };

  const handleUserSelect = (user: { id: string; username: string }) => {
    const beforeCursor = postDetails.slice(0, cursorPosition);
    const afterCursor = postDetails.slice(cursorPosition);

    // Replace "@" mention with selected user name
    const updatedPostDetails =
      beforeCursor.replace(/@\w*$/, `${user.username} `) + afterCursor;
    console.log(updatedPostDetails);
    setPostDetails(updatedPostDetails);
    setShowUserList(false);
    setSearchTerm("");
  };

  const handleCloseModel = () => {
    handleClose();
  };

  const handlePostBtn = (e) => {
    e.preventDefault();
    if (postDetails?.trim() !== "") handleConfirmPost(postDetails);
  };

  return (
    <Dialog open={open} fullScreen>
      <div className="flex justify-between bg-[#4287f5] h-14 p-4">
        <h2 className="text-slate-100 text-xl font-bold">Add new post</h2>
        <IconButton
          aria-label="close"
          onClick={handleCloseModel}
          className="bg-slate-100"
        >
          <IoCloseCircle className="text-slate-100" />
        </IconButton>
      </div>

      <form
        className={`dialog-content h-full flex flex-col items-center p-10 gap-4`}
        onSubmit={handlePostBtn}
      >
        <div>
          <label htmlFor="postDetails" className="hidden">
            Post Details
          </label>
          <textarea
            rows={20}
            cols={200}
            id="postDetails"
            name="postDetails"
            placeholder="Enter Description"
            onChange={handlePostChange}
            value={postDetails}
            className="border rounded-md border-[#4287f5] p-4"
          />

          {showUserList && userData?.searchUser && (
            <ul className="absolute bg-white border border-gray-300 rounded-md w-full max-h-40 overflow-y-auto z-10">
              {userData.searchUser.map(
                (user: { id: string; username: string }) => (
                  <li
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className="cursor-pointer hover:bg-gray-200 p-2"
                  >
                    {user.username}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        <button className="bg-[#4287f5] self-end p-4 text-slate-100 w-[7rem] rounded-md">
          Post
        </button>
      </form>
    </Dialog>
  );
};

const FETCH_USERS = gql`
  query searchUser($searchTerm: String!) {
    searchUser(searchTerm: $searchTerm) {
      id
      email
      username
    }
  }
`;

export default Modal;
