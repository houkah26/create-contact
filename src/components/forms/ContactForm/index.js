import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import {
  Form,
  Message,
  Icon,
  Header,
  Segment,
  Divider
} from "semantic-ui-react";

import "./index.css";

import stateOptions from "./stateOptions";
import { createContact, clearContact } from "../../../actions/contact";
import {
  getIsContactRequesting,
  getContactErrorMessage,
  getContactName
} from "../../../reducers";
import renderFields from "../components/renderFields";
import DismissibleMessage from "../../messages/DismissibleMessage";

const nameFields = [
  {
    name: "title",
    type: "select",
    selectOptions: [
      { key: "Mr.", value: "Mr." },
      { key: "Mrs.", value: "Mrs." },
      { key: "Ms.", value: "Ms." }
    ],
    width: 2,
    required: true
  },
  {
    name: "givenName",
    displayName: "First Name",
    required: true,
    width: 6
  },
  {
    name: "middleInitial",
    displayName: "M.I.",
    inputOptions: {
      maxLength: 1
    },
    width: 2
  },
  {
    name: "surname",
    displayName: "Last Name",
    required: true,
    width: 6
  }
];

const addressField = [
  {
    name: "streetAddress",
    required: true
  }
];

const locationFields = [
  {
    name: "city",
    width: 8,
    required: true
  },
  {
    name: "state",
    type: "select",
    selectOptions: stateOptions,
    width: 2,
    required: true
  },
  {
    name: "zipCode",
    type: "number",
    inputOptions: {
      max: 99999
    },
    width: 6,
    required: true
  }
];

const contactFields = [
  {
    name: "email",
    type: "email",
    required: true
  },
  {
    name: "telephoneNumber",
    type: "tel",
    required: true
  }
];

const userInfoFields = [
  {
    name: "username",
    required: true
  },
  {
    name: "password",
    type: "password",
    required: true
  },
  {
    name: "confirmPassword",
    type: "password",
    required: true
  }
];

const securityFields = [
  {
    name: "mothersMaiden",
    displayName: "Mothers Maiden Name"
  },
  {
    name: "nationalId",
    displayName: "SSN",
    inputOptions: {
      placeholder: "XXX-XX-XXXX"
    }
  }
];

const birthdayFields = [
  {
    name: "age",
    type: "number",
    inputOptions: {
      max: 150,
      min: 0
    }
  },
  {
    name: "birthday",
    type: "date"
  },
  {
    name: "gender",
    type: "select",
    selectOptions: [{ key: "M", value: "male" }, { key: "F", value: "female" }],
    required: true
  }
];

const creditCard = [
  {
    name: "ccType",
    displayName: "Card Type",
    type: "select",
    selectOptions: [
      { key: "American Express", value: "American Express" },
      { key: "Discover", value: "Discover" },
      { key: "Master Card", value: "Master Card" },
      { key: "Visa", value: "Visa" }
    ],
    width: 5
  },
  {
    name: "ccNumber",
    displayName: "Credit Card Number",
    type: "number",
    width: 7
  },
  {
    name: "cvv2",
    displayName: "CVV2",
    type: "number",
    inputOptions: {
      max: 9999
    },
    width: 2
  },
  {
    name: "ccExpires",
    displayName: "Expiration",
    inputOptions: {
      placeholder: "XX/XXXX"
    },
    width: 2
  }
];

const employmentFields = [
  {
    name: "company"
  },
  {
    name: "occupation"
  }
];

const trackingFields = [
  {
    name: "ups",
    displayName: "UPS",
    inputOptions: {
      placeholder: "XX XXX XXX XX XXXX XXX X"
    }
  },
  {
    name: "westernUnionMTCN",
    displayName: "Western Union MTCN",
    type: "number",
    inputOptions: {
      max: 999999999
    }
  },
  {
    name: "moneyGramMTCN",
    displayName: "MoneyGram MTCN",
    type: "number",
    inputOptions: {
      max: 99999999
    }
  }
];

const miscFields = [
  {
    name: "domain",
    displayName: "Website"
  },
  {
    name: "Vehicle"
  },
  {
    name: "color",
    displayName: "Favorite Color"
  }
];

// Form validation for redux-form
const validate = formProps => {
  const errors = {};

  if (!formProps.title) {
    errors.title = " ";
  }

  if (!formProps.givenName) {
    errors.givenName = " ";
  }

  if (!formProps.surname) {
    errors.surname = " ";
  }

  if (!formProps.gender) {
    errors.gender = " ";
  }

  if (!formProps.username) {
    errors.username = " ";
  }

  if (!formProps.password) {
    errors.password = " ";
  }

  if (formProps.password !== formProps.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!formProps.addressField) {
    errors.addressField = " ";
  }

  if (!formProps.city) {
    errors.city = " ";
  }

  if (!formProps.state) {
    errors.state = " ";
  }

  if (!formProps.zipCode) {
    errors.zipCode = " ";
  }

  if (!formProps.email) {
    errors.email = " ";
  }

  if (!formProps.telephoneNumber) {
    errors.telephoneNumber = " ";
  }

  return errors;
};

// Returns full state given a abbreviation
const fullState = (stateOptions, stateAbrv) => {
  let fullStateName = "";

  stateOptions.forEach(state => {
    if (state.key === stateAbrv) {
      fullStateName = state.text;
    }
  });

  // Return empty string if not found
  return fullStateName;
};

class CreateContactForm extends Component {
  state = {
    latitude: null,
    longitude: null
  };

  componentDidMount() {
    // this.props.clearContact();
    this.getCoords();
  }

  getCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCoords);
    }
  };

  setCoords = position => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  handleFormSubmit = formProps => {
    // Clear contact state before submitting new request
    this.props.clearContact();

    const newContact = {
      ...formProps,
      browserUserAgent: navigator.userAgent,
      stateFull: fullState(stateOptions, formProps.state),
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    console.log(newContact);
    this.props.createContact(formProps);

    // Reset Form
    this.props.reset();
  };

  render() {
    const {
      handleSubmit, // Submit handler for redux-form
      errorMessage,
      isLoading,
      anyTouched,
      valid,
      newContactName
    } = this.props;
    const containsError = errorMessage.length > 0;
    const showReqFieldsMessage = anyTouched && !valid;

    return (
      <Segment className="ContactForm" raised={true}>
        <Header size="huge" textAlign="center">
          Create Contact
        </Header>
        <Form
          error={containsError}
          onSubmit={handleSubmit(this.handleFormSubmit)}
        >
          <Message error header="Error:" content={errorMessage} />
          <div>
            <Header size="medium">General</Header>
            <Form.Group>{renderFields(nameFields)}</Form.Group>
            {renderFields(addressField)}
            <Form.Group>{renderFields(locationFields)}</Form.Group>
            <Form.Group widths="equal">
              {renderFields(contactFields)}
            </Form.Group>
            <Form.Group>{renderFields(birthdayFields)}</Form.Group>
          </div>
          <Divider />
          <div>
            <Header size="medium">User Info</Header>
            <Form.Group widths="equal">
              {renderFields(userInfoFields)}
            </Form.Group>
          </div>
          <Divider />
          <div>
            <Header size="medium">Security</Header>
            <Form.Group widths="equal">
              {renderFields(securityFields)}
            </Form.Group>
          </div>
          <Divider />
          <div>
            <Header size="medium">Credit Card</Header>
            <Form.Group>{renderFields(creditCard)}</Form.Group>
          </div>
          <Divider />
          <div>
            <Header size="medium">Employment</Header>
            <Form.Group widths="equal">
              {renderFields(employmentFields)}
            </Form.Group>
          </div>
          <Divider />
          <div>
            <Header size="medium">Tracking</Header>
            <Form.Group widths="equal">
              {renderFields(trackingFields)}
            </Form.Group>
          </div>
          <Divider />
          <div>
            <Header size="medium">Miscellaneous</Header>
            <Form.Group widths="equal">{renderFields(miscFields)}</Form.Group>
          </div>
          <Form.Button loading={isLoading} color="blue">
            <Icon name="signup" />Create Contact
          </Form.Button>
          {showReqFieldsMessage && (
            <span style={{ color: "#9F3A38" }}>
              Please fill in required fields
            </span>
          )}
        </Form>
        {newContactName && (
          <DismissibleMessage
            success
            header="Success!"
            content={`${newContactName} was successfully added to the contact list.`}
          />
        )}
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: getContactErrorMessage(state),
  isLoading: getIsContactRequesting(state),
  newContactName: getContactName(state)
});

const createForm = reduxForm({
  form: "createContactForm",
  validate
});

export default connect(mapStateToProps, { createContact, clearContact })(
  createForm(CreateContactForm)
);
