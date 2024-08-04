import React, { useState } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import "./Contact.css";
import DETAILS from "../../utils/contactDetails";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const validateEmail = (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

  const handleSubmit = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (name.trim() === "") {
      setNameError("Please enter your name.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (description.trim() === "") {
      setDescriptionError("Please enter a description.");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (isValid) {
      console.log("Form submitted successfully!");
    }
  };

  return (
    <div className="contacts">
      <div className="lr">
        <div className="left">
          <h1 className="heading">Contact us for more details</h1>
          <div className="left_inputs">
            <div className="one">
              <div className="input-wrapper">
                <Input
                  className="input"
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  isRequired
                  variant="bordered"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderColor: emailError ? "red" : "",
                  }}
                />
                {emailError && <div className="error">{emailError}</div>}
              </div>
              <div className="input-wrapper">
                <Input
                  className="input"
                  type="text"
                  label="Name"
                  labelPlacement="outside"
                  isRequired
                  placeholder="Enter your name"
                  variant="bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    borderColor: nameError ? "red" : "",
                  }}
                />
                {nameError && <div className="error">{nameError}</div>}
              </div>
            </div>
            <Textarea
              isRequired
              label="Description"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter your description"
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                borderColor: descriptionError ? "red" : "",
              }}
              classNames={{
                base: "max-w-full",
                input: "resize-y min-h-[40px]",
              }}
            />
            {descriptionError && (
              <div className="error">{descriptionError}</div>
            )}
            <div className="button-wrapper">
              <Button className="button" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="right">
          {DETAILS.map((e) => (
            <div key={e} className="details">
              <div className="detailsTitle">
                <e.icon
                  className="icon"
                  size={30}
                  onClick={() => (window.location.href = e.link)}
                />
                <div className="detitle">{e.title}</div>
              </div>
              <div className="detailsDescription">{e.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
