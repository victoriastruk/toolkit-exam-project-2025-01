import { useField } from 'formik';

const FieldFileInput = ({ name, classes }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  const handleChange = (e) => {
    const file = e.currentTraget.files[0];
    setValue(file || null);
  };

  const fileName = field.value?.name || 'No file chosen';
  return (
    <div className={fileUploadContainer}>
      <label htmlFor={name} className={labelClass}>
        Choose file
      </label>
      <span className={fileNameClass}>{fileName}</span>
      <input
        name={name}
        className={fileInput}
        id={name}
        type="file"
        onChange={handleChange}
      />
    </div>
  );
};

export default FieldFileInput;
