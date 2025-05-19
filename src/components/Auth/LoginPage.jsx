import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import '../../index/Login.css';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '', form: null });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validators = {
    name: {
      required: 'Please enter your name.',
      pattern: /^[A-Za-z][A-Za-z\s]{0,19}$/,
      message: 'Please enter a name that contains only letters (up to 20 characters).',
    },
    email: {
      required: 'Please enter your email address.',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address.',
    },
  };

  const validateField = (field, value) => {
    const { required, pattern, message } = validators[field];
    if (!value.trim()) return required;
    if (!pattern.test(value)) return message;
    return '';
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleBlur = (field) => {
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);

    if (nameError || emailError) {
      setErrors({ ...errors, name: nameError, email: emailError });
      return;
    }

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, form: null }));

    try {
      await login(formData.name, formData.email);
      onLogin();
      navigate('/search');
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container-login">
        <div className="card">
          <h1 className="title">Login to Fetch!</h1>
          <h2 className="description">Find your perfect dog.</h2>

          <form onSubmit={handleSubmit} className="form">
            {['name', 'email'].map((field) => (
              <div className="input-group" key={field}>
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  id={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  onBlur={() => handleBlur(field)}
                  disabled={isLoading}
                  className="input"
                  placeholder={field === 'email' ? 'you@example.com' : 'Your Name'}
                />
                {errors[field] && (
                  <div className="validation-error" style={{ whiteSpace: 'pre-line' }}>
                    {errors[field]}
                  </div>
                )}
              </div>
            ))}

            <button type="submit" disabled={isLoading} className="button">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            {errors.form && <div className="alert">⚠️ {errors.form}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
