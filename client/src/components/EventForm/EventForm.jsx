import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import validationSchemas from '../../utils/validators/validationSchems';
import { addEvent } from '../../store/slices/eventsSlice';
import FormInput from '../FormInput/FormInput';

import styles from './EventForm.module.sass';

const EventForm = () => {
  const dispatch = useDispatch();

  const { EventSchema } = validationSchemas;

  const initialValues = {
    name: '',
    date: '',
    time: '',
    notifyBefore: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    const newEvent = {
      id: Date.now(),
      ...values,
      notifyBefore: Number(values.notifyBefore),
      notified: false,
    };

    dispatch(addEvent(newEvent));

    resetForm();
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={EventSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h1 className={styles.title}>Create new event</h1>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>Event name</span>
              <FormInput
                name="name"
                type="text"
                label="Name"
                classes={{
                  container: styles.componentInputContainer,
                  input: styles.input,
                  warning: styles.warning,
                }}
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>Choose date</span>
              <FormInput
                name="date"
                type="date"
                label="Date"
                classes={{
                  container: styles.componentInputContainer,
                  input: styles.input,
                  warning: styles.warning,
                }}
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>Enter time</span>
              <FormInput
                name="time"
                type="time"
                classes={{
                  container: styles.componentInputContainer,
                  input: styles.input,
                  warning: styles.warning,
                }}
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>Notify before</span>
              <FormInput
                name="notifyBefore"
                type="number"
                label="Enter time in minutes"
                classes={{
                  container: styles.componentInputContainer,
                  input: styles.input,
                  warning: styles.warning,
                }}
              />
            </div>
            <button
              className={styles.addBtn}
              type="submit"
              disabled={isSubmitting}
            >
              Add event
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventForm;
