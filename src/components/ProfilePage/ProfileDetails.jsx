import React, { useState } from "react";
import { auth, db } from "../../config/firebase";
import { updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../config/firebase";
import { toast } from "react-toastify";

function ProfileDetails() {
  const [name, setName] = useState(auth.currentUser.displayName);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [formDisabled, setformDisabled] = useState(true);

  const storeImage = async () => {
    return new Promise((resolve, reject) => {
      const fileName = `${auth.currentUser.uid}`;
      const storageRef = ref(storage, `images/` + fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot.totalBytes);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const onSubmitImage = async (e) => {
    e.preventDefault();
    try {
      const imgUrl = await storeImage();
      await updateProfile(auth.currentUser, { photoURL: imgUrl });
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { ["avatar_url"]: imgUrl });
      setProgress(0);
      toast.success("Image updated succesfully");
    } catch (error) {
      toast.error("Image could not be uploaded");
      setProgress(0);
    }
  };

  const onChangeImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  //Name change Functions
  const onSubmitName = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      toast.error("Name should have minimum 4 letters");
      return;
    }
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { name });
      toast.success("Name updated succesfully");
    } catch (error) {
      toast.error("Could not change profile name");
    }
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-3 w-80">
        <div className="flex mb-2 mt-10 items-center justify-between">
          <h3 className="text-lg uppercase font-bold">Profile Details</h3>
          <p
            className="hover:text-primary cursor-pointer"
            onClick={() => {
              setformDisabled((prevState) => !prevState);
            }}
          >
            change
          </p>
        </div>
        {/* Name Form */}
        <form onSubmit={onSubmitName} className="form-control w-full max-w-xs ">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            disabled={formDisabled}
            type="text"
            value={name}
            placeholder="Name"
            className="input input-bordered w-full max-w-xs input-primary"
            onChange={onChangeName}
          />
          <button
            type="submit"
            disabled={formDisabled}
            className="btn-primary mt-4 rounded-lg"
          >
            Change
          </button>
        </form>
        {/* Email form */}
        <div className="form-control w-full max-w-xs ">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            disabled
            type="text"
            placeholder="Email"
            value={auth.currentUser.email}
            className="input input-bordered w-full max-w-xs input-primary"
          />
        </div>
        {/* Profile picture update */}
        <form
          onSubmit={onSubmitImage}
          className="form-control w-full max-w-xs "
        >
          <label className="label">
            <span className="label-text">Avatar photo</span>
            <span className="label-text-alt">max 2mb</span>
          </label>
          <input
            disabled={formDisabled}
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            onChange={onChangeImage}
          />
          <progress
            className="progress progress-success w-full mt-2"
            value={progress}
            max="100"
          ></progress>
          <button
            type="submit"
            disabled={formDisabled}
            className="btn-primary mt-4 rounded-lg"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

export default ProfileDetails;
