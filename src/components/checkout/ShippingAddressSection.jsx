import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../common/Button";
import { SelectInput, TextInput } from "../forms/FormFields";
import { useToast } from "../../context/ToastContext";

const ShippingAddressSection = ({
  addresses = [],
  profileDefaults = {},
  selectedAddressId,
  onSelectAddress,
  onAddAddress,
  onUpdateAddress,
  onRemoveAddress,
  onMakeDefaultAddress,
  includeEmail = true,
  showSelectDropdown = true,
  allowRemoval = false,
  showSelectedCard = true,
  sectionTitle = "Shipping Address",
  actionLabel = "Add Shipping Address",
  hideHeader = false,
  layout = "inline",
  selectLabel = "Select saved address",
  prefillAddress = null,
  onPrefillConsumed,
}) => {
  const { showToast } = useToast();

  const defaultAddress = useMemo(
    () => addresses.find((addr) => addr.isDefault) || addresses[0],
    [addresses]
  );

  const buildFormState = useCallback(
    (initial = {}) => ({
      label: initial.label || "",
      fullName: initial.fullName || profileDefaults.fullName || "",
      email: includeEmail ? initial.email || profileDefaults.email || "" : "",
      phone: initial.phone || profileDefaults.phone || "",
      addressLine: initial.addressLine || "",
      city: initial.city || "",
      state: initial.state || "",
      postalCode: initial.postalCode || "",
      isDefault: initial.isDefault ?? (addresses.length === 0),
    }),
    [includeEmail, profileDefaults, addresses.length]
  );

  const [isFormOpen, setIsFormOpen] = useState(addresses.length === 0);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState(buildFormState());
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (prefillAddress) {
      setFormState(buildFormState(prefillAddress));
      setEditingId(prefillAddress.id);
      setIsFormOpen(true);
      onPrefillConsumed?.();
    }
  }, [prefillAddress, buildFormState, onPrefillConsumed]);

  useEffect(() => {
    if (!addresses.length) {
      setIsFormOpen(true);
      setEditingId(null);
      setFormState(buildFormState());
    }
  }, [addresses.length, buildFormState]);

  const selectedAddress = useMemo(
    () => addresses.find((addr) => addr.id === selectedAddressId) || defaultAddress,
    [addresses, selectedAddressId, defaultAddress]
  );

  const handleToggleForm = () => {
    if (isFormOpen) {
      setEditingId(null);
      setFormState(buildFormState());
      setFormErrors({});
    }
    setIsFormOpen((prev) => !prev);
  };

  const openEditAddress = (address) => {
    setFormState(buildFormState(address));
    setEditingId(address.id);
    setIsFormOpen(true);
  };

  const handleSelectChange = (value) => {
    if (!value) {
      setEditingId(null);
      setFormState(buildFormState());
      setFormErrors({});
      setIsFormOpen(true);
      return;
    }
    onSelectAddress?.(value);
    setIsFormOpen(false);
  };

  const validateForm = () => {
    const requiredFields = ["label", "fullName", "phone", "addressLine", "city", "state", "postalCode"];
    if (includeEmail) requiredFields.push("email");

    const errors = {};
    requiredFields.forEach((field) => {
      if (!String(formState[field] || "").trim()) {
        errors[field] = "Required";
      }
    });

    if (includeEmail && formState.email && !/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Enter a valid email";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      label: formState.label.trim(),
      fullName: formState.fullName.trim(),
      email: includeEmail ? formState.email.trim() : "",
      phone: formState.phone.trim(),
      addressLine: formState.addressLine.trim(),
      city: formState.city.trim(),
      state: formState.state.trim(),
      postalCode: formState.postalCode.trim(),
      isDefault: formState.isDefault,
    };

    try {
      if (editingId) {
        const updated = await Promise.resolve(onUpdateAddress?.(editingId, payload));
        if (updated?.id) {
          onSelectAddress?.(updated.id);
        }
        showToast("Address updated successfully", "success");
      } else {
        const created = await Promise.resolve(onAddAddress?.(payload));
        if (created?.id) {
          onSelectAddress?.(created.id);
        }
        showToast("Address added successfully", "success");
      }
      setFormState(buildFormState());
      setEditingId(null);
      setIsFormOpen(false);
      setFormErrors({});
    } catch (error) {
      showToast("Unable to save address", "error");
    }
  };

  const summaryButtons = selectedAddress && (
    <div className="flex flex-wrap gap-3 mt-4">
      <Button variant="secondary" size="sm" onClick={() => openEditAddress(selectedAddress)}>
        Edit address
      </Button>
      {!selectedAddress?.isDefault && (
        <Button variant="textPrimary" size="sm" onClick={() => onMakeDefaultAddress?.(selectedAddress.id)}>
          Make default
        </Button>
      )}
      {allowRemoval && (
        <Button variant="textDanger" size="sm" onClick={() => onRemoveAddress?.(selectedAddress.id)}>
          Remove
        </Button>
      )}
    </div>
  );

  const containerClasses =
    layout === "inline" ? "bg-white rounded-3xl p-6 md:p-8 shadow-lg animate-fade-in-up" : "";
  const shouldRenderSelectedCard = showSelectedCard && layout !== "modal";

  return (
    <div className={containerClasses}>
      {!hideHeader && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">{sectionTitle}</h2>
            {layout !== "inline" && (
              <p className="text-sm text-text-grey mt-1">
                Manage where you want your orders to be delivered.
              </p>
            )}
          </div>
          <Button variant="outline" size="sm" shape="rounded" onClick={handleToggleForm}>
            {isFormOpen ? "Close Form" : actionLabel}
          </Button>
        </div>
      )}

      {addresses.length > 0 && showSelectDropdown && (
        <div className="mb-6">
          <SelectInput
            id="address-select"
            name="addressSelect"
            label={selectLabel}
            value={selectedAddressId || ""}
            onChange={(e) => handleSelectChange(e.target.value)}
            options={[
              { value: "", label: "Add a new address" },
              ...addresses.map((a) => ({
                value: a.id,
                label: `${a.label || "Address"} • ${a.city}, ${a.state}`,
              })),
            ]}
          />
        </div>
      )}

      {shouldRenderSelectedCard && selectedAddress && (
        <div className="relative border-2 border-secondary rounded-2xl p-5 mb-6">
          {selectedAddress.isDefault && (
            <span className="absolute top-3 right-3 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
              Default
            </span>
          )}
          <div className="space-y-2">
            {includeEmail && (
              <p className="text-sm text-text-grey">
                <span className="font-medium">Contact:</span> {selectedAddress.email || profileDefaults.email}
              </p>
            )}
            <p className="text-sm text-text-grey">
              <span className="font-medium">Name:</span> {selectedAddress.fullName}
            </p>
            <p className="text-sm text-text-grey">
              <span className="font-medium">Phone:</span> {selectedAddress.phone}
            </p>
            <p className="text-sm text-text-grey">
              <span className="font-medium">Ship to:</span>{" "}
              {selectedAddress.addressLine}, {selectedAddress.city}, {selectedAddress.state}{" "}
              {selectedAddress.postalCode}
            </p>
          </div>
          {summaryButtons}
        </div>
      )}

      {isFormOpen && (
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              id="address-label"
              name="label"
              label="Address Label *"
              value={formState.label}
              onChange={(e) => setFormState((prev) => ({ ...prev, label: e.target.value }))}
              placeholder="Home"
              inputClassName={formErrors.label ? "border-danger" : ""}
            />
            {formErrors.label && <p className="text-danger text-xs -mt-3">{formErrors.label}</p>}

            <TextInput
              id="address-fullname"
              name="fullName"
              label="Full Name *"
              value={formState.fullName}
              onChange={(e) => setFormState((prev) => ({ ...prev, fullName: e.target.value }))}
              placeholder="John Doe"
              inputClassName={formErrors.fullName ? "border-danger" : ""}
            />
            {formErrors.fullName && <p className="text-danger text-xs -mt-3">{formErrors.fullName}</p>}

            {includeEmail && (
              <TextInput
                id="address-email"
                name="email"
                label="Email Address *"
                value={formState.email}
                onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com"
                type="email"
                inputClassName={formErrors.email ? "border-danger" : ""}
              />
            )}
            {includeEmail && formErrors.email && (
              <p className="text-danger text-xs -mt-3">{formErrors.email}</p>
            )}

            <TextInput
              id="address-phone"
              name="phone"
              label="Phone Number *"
              value={formState.phone}
              onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="08012345678"
              inputClassName={formErrors.phone ? "border-danger" : ""}
            />
            {formErrors.phone && <p className="text-danger text-xs -mt-3">{formErrors.phone}</p>}

            <div className="md:col-span-2">
              <TextInput
                id="address-line"
                name="addressLine"
                label="Street Address *"
                value={formState.addressLine}
                onChange={(e) => setFormState((prev) => ({ ...prev, addressLine: e.target.value }))}
                placeholder="123 Main Street"
                inputClassName={formErrors.addressLine ? "border-danger" : ""}
              />
              {formErrors.addressLine && (
                <p className="text-danger text-xs -mt-3">{formErrors.addressLine}</p>
              )}
            </div>

            <TextInput
              id="address-city"
              name="city"
              label="City *"
              value={formState.city}
              onChange={(e) => setFormState((prev) => ({ ...prev, city: e.target.value }))}
              placeholder="Lagos"
              inputClassName={formErrors.city ? "border-danger" : ""}
            />
            {formErrors.city && <p className="text-danger text-xs -mt-3">{formErrors.city}</p>}

            <TextInput
              id="address-state"
              name="state"
              label="State *"
              value={formState.state}
              onChange={(e) => setFormState((prev) => ({ ...prev, state: e.target.value }))}
              placeholder="Lagos State"
              inputClassName={formErrors.state ? "border-danger" : ""}
            />
            {formErrors.state && <p className="text-danger text-xs -mt-3">{formErrors.state}</p>}

            <TextInput
              id="address-postal"
              name="postalCode"
              label="Postal Code *"
              value={formState.postalCode}
              onChange={(e) => setFormState((prev) => ({ ...prev, postalCode: e.target.value }))}
              placeholder="100001"
              inputClassName={formErrors.postalCode ? "border-danger" : ""}
            />
            {formErrors.postalCode && (
              <p className="text-danger text-xs -mt-3">{formErrors.postalCode}</p>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              name="isDefault"
              checked={formState.isDefault}
              onChange={(e) => setFormState((prev) => ({ ...prev, isDefault: e.target.checked }))}
              className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded"
            />
            Set as default address
          </label>

          <Button type="submit" variant="secondary" size="md" shape="rounded">
            {editingId ? "Update Address" : "Save Address"}
          </Button>
        </form>
      )}

      {!addresses.length && !isFormOpen && (
        <div className="text-center py-12 text-text-grey">
          No addresses yet. Add one to proceed.
        </div>
      )}
    </div>
  );
};

export default ShippingAddressSection;

