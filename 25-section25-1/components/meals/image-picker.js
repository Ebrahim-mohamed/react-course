"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
export default function ImagePicker({ label, name }) {
  const imagePicker = useRef();
  const [pickedImage, setPickedImage] = useState();
  function handelImagePicker() {
    imagePicker.current.click();
  }
  function handelPickingImage(event) {
    const pickedImage = event.target.files[0];
    if (!pickedImage) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(pickedImage);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No images picked</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="an image picked by user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/jpeg image/png"
          name={name}
          ref={imagePicker}
          onChange={handelPickingImage}
          required
        />
        <button
          onClick={handelImagePicker}
          className={classes.button}
          type="button"
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
