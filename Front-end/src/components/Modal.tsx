import React, { useState } from "react";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { IoCloseCircle } from "react-icons/io5";
import { BsCloudUploadFill } from "react-icons/bs";

interface IModal {
  open: boolean;
  handleClose: () => void;
  handleConfirmPost: (value: string) => void;
}

const Modal = ({ open, handleClose, handleConfirmPost }: IModal) => {
  const [postDetails, setPostDetails] = useState<string>("");

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostDetails(e.target.value);
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
        <h2 className="text-slate-100 text-xl font-bold">Upload Image</h2>
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
            className="border rounded-md border-[#4287f5] p-4"
          />
        </div>

        <button className="bg-[#4287f5] self-end p-4 text-slate-100 w-[7rem] rounded-md">
          Post
        </button>
      </form>
    </Dialog>
  );
};

export default Modal;
