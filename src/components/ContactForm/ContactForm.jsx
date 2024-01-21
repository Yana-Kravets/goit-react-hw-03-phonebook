import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { StyledForm, StyledField, Label, ErrorText, Button } from './ContactForm.styled';

export class ContactForm extends Component {
  initialValues = {
    name: '',
    number: '',
  };

  validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!')
    .max(50, 'Too Long!').required(),
    number: Yup.string().min(1).max(13).required(),
  });

  handleSubmit = (values, { resetForm }) => {
    this.props.handleSubmit(values);
    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
      >
        <StyledForm>
          <Label>
            Name
            <StyledField
              type="text"
              name="name"
              placeholder="Enter name"
              // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              // required
            />
            <ErrorMessage name="name" component={ErrorText} />
          </Label>
          <Label>
            Number
            <StyledField
              type="tel"
              name="number"
              placeholder="Enter phone number"
              // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              // required
            />
            <ErrorMessage name="number" component={ErrorText} />
          </Label>
          <Button type="submit">Add contact</Button>
        </StyledForm>
      </Formik>
    );
  }
}

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
