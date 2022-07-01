import { useState } from 'react';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

const SignInForm = () => {
  const [formFields, setFormFields] = useState({ email: '', password: '' });
  const { email, password } = formFields; // destructure

  // INPUT CHANGE HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // GOOGLE POP-UP SIGN IN
  const signInUserWithGooglePopup = async () => {
    await signInWithGooglePopup();
  };

  // FORM SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      // clear form fields
      setFormFields({ displayName: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect Password');
          break;
        case 'auth/user-not-found':
          alert('Email not correct');
          break;
        default:
          console.log(error.code);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account? Sign in with your email and password</h2>
      <form onSubmit={handleSubmit}>
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

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInUserWithGooglePopup}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
