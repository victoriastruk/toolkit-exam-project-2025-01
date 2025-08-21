import classNames from 'classnames';
import { useField } from 'formik';
import { useState } from 'react';

const ImageUpload = ({ name, classes }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const [preview, setPreview] = useState(null);
  const { uploadContainer, inputContainer, imgStyle, fileNameClass } = classes;

  const handleChange = (e) => {
    const file = e.currentTarget.files[0];
    const imageType = /image.*/;

    if (!file || !file.type.match(imageType)) {
      e.target.value = '';
      setValue(null);
      setPreview(null);
    } else {
      setValue(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  
  const fileName = field.value?.name || 'No image chosen';

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.jpg, *.jpeg)</span>
        <input
          name={name}
          id={name}
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={handleChange}
        />
        <label htmlFor={name}>Chose file</label>
        <p>{fileName}</p>
      </div>
      {preview && (
        <img
          src={preview}
          className={classNames({ [imgStyle]: !!field.value })}
          alt="user"
        />
      )}
    </div>
  );
};

export default ImageUpload;
