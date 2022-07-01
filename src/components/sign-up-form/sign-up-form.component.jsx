import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const SignUpForm = () => {
  // input states
  const [formFields, setFormFields] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { displayName, email, password, confirmPassword } = formFields;
  // Context
  const { setCurrentUser } = useContext(UserContext);

  // FORM SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("password doesn't match");
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(response.user); // Context

      // storing user in database after saving in Auth
      await createUserDocumentFromAuth(response.user, { displayName });
      // clear form fields
      setFormFields({ displayName: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already registered !');
      } else {
        console.log('create user with email password : ' + error);
      }
    }
  };

  // INPUT CHANGE HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
