import React, { useState, useEffect } from "react";
import { TextInput } from "./FormFields";
import { Button } from "../common/Button";

const baseValues = {
  label: "",
  fullName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  isDefault: false,
};

const ShippingAddressForm = ({
  initialValues = baseValues,
  onSubmit,
  onCancel,
  submitLabel = "Save address",
  cancelLabel = "Cancel",
  showCancel = true,
  requireEmail = true,
  showEmailField = true,
  className = "",
}) => {
  const [values, setValues] = useState({ ...baseValues, ...initialValues });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues({ ...baseValues, ...initialValues });
    setErrors({});
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const requiredFields = ["label", "fullName", "phone", "street", "city", "state", "postalCode"];
    const nextErrors = {};

    requiredFields.forEach((field) => {
      if (!String(values[field] || "").trim()) {
        nextErrors[field] = "Required";
      }
    });

    if (showEmailField && requireEmail) {
      if (!values.email.trim()) {
        nextErrors.email = "Required";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        nextErrors.email = "Enter a valid email";
      }
    } else if (showEmailField && values.email.trim() && !/\S+@\S+\.\S+/.test(values.email)) {
      nextErrors.email = "Enter a valid email";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...values,
      label: values.label.trim(),
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      street: values.street.trim(),
      city: values.city.trim(),
      state: values.state.trim(),
      postalCode: values.postalCode.trim(),
    };

    onSubmit?.(payload);
  };

  return (
    <form className={`space-y-4 ${className}`} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          id="addressLabel"
          name="label"
          label="Address Label *"
          value={values.label}
          onChange={handleChange}
          placeholder="Home"
          inputClassName={errors.label ? "border-danger" : ""}
        />
        <TextInput
          id="addressFullName"
          name="fullName"
          label="Full Name *"
          value={values.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          inputClassName={errors.fullName ? "border-danger" : ""}
        />

        {showEmailField && (
          <TextInput
            id="addressEmail"
            name="email"
            label="Email Address"
            value={values.email}
            onChange={handleChange}
            placeholder="john@example.com"
            type="email"
            inputClassName={errors.email ? "border-danger" : ""}
          />
        )}

        <TextInput
          id="addressPhone"
          name="phone"
          label="Phone Number *"
          value={values.phone}
          onChange={handleChange}
          placeholder="08012345678"
          type="tel"
          inputClassName={errors.phone ? "border-danger" : ""}
        />

        <div className="md:col-span-2">
          <TextInput
            id="addressStreet"
            name="street"
            label="Street Address *"
            value={values.street}
            onChange={handleChange}
            placeholder="123 Main Street"
            inputClassName={errors.street ? "border-danger" : ""}
          />
        </div>

        <TextInput
          id="addressCity"
          name="city"
          label="City *"
          value={values.city}
          onChange={handleChange}
          placeholder="Lagos"
          inputClassName={errors.city ? "border-danger" : ""}
        />
        <TextInput
          id="addressState"
          name="state"
          label="State *"
          value={values.state}
          onChange={handleChange}
          placeholder="Lagos State"
          inputClassName={errors.state ? "border-danger" : ""}
        />

        <TextInput
          id="addressPostalCode"
          name="postalCode"
          label="Postal Code *"
          value={values.postalCode}
          onChange={handleChange}
          placeholder="100001"
          inputClassName={errors.postalCode ? "border-danger" : ""}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-text-primary">
        <input
          type="checkbox"
          name="isDefault"
          checked={values.isDefault}
          onChange={handleChange}
          className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded"
        />
        Set as default address
      </label>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="secondary" size="md">
          {submitLabel}
        </Button>
        {showCancel && (
          <Button type="button" variant="textPrimary" size="md" onClick={onCancel}>
            {cancelLabel}
          </Button>
        )}
      </div>
    </form>
  );
};

export default ShippingAddressForm;

