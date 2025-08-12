import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../components/common/AuthHeader";
import { TextInput, SelectInput } from "../../components/forms/FormFields";
import { Button } from "../../components/common/Button";

const LocationInfo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    country: "Nigeria",
    state: "",
    lga: "",
  });

  const stateOptions = [
    "Select State",
    "Lagos",
    "Abuja",
    "Kano",
    "Rivers",
    "Oyo",
    "Delta",
    "Kaduna",
    "Ogun",
    "Imo",
    "Plateau",
  ];

  const lgaOptions = [
    "Select LGA",
    "Ikeja",
    "Victoria Island",
    "Lekki",
    "Surulere",
    "Yaba",
    "Ikoyi",
    "Ajah",
    "Gbagada",
    "Alimosho",
    "Agege",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to next step
      navigate("/confirm-business-id");
    } catch (error) {
      console.error("Error submitting location info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/confirm-business-id");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white py-15">

      <div className="w-full max-w-xl px-4">
        <AuthHeader
          logo="/imgs/Logo-2.svg"
          logoWidth="w-20 h-20 mx-auto"
          title="Location information"
          subtitle="Provide valid information for your client to reach you"
          showBackButton={false}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextInput
            id="address"
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your business address"
            required
            className="mb-6"
            inputClassName="rounded-lg"
          />

          <TextInput
            id="country"
            name="country"
            label="Country"
            value={formData.country}
            onChange={handleInputChange}
            disabled
            className="mb-6"
            inputClassName="rounded-lg"
          />

          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              id="state"
              name="state"
              label="State"
              value={formData.state}
              onChange={handleInputChange}
              options={stateOptions}
              required
              inputClassName="rounded-lg"
            />

            <SelectInput
              id="lga"
              name="lga"
              label="LGA"
              value={formData.lga}
              onChange={handleInputChange}
              options={lgaOptions}
              required
              inputClassName="rounded-lg"
            />
          </div>

          <div className="flex gap-4 pt-8 justify-evenly">


            <Button
            variant="ghost"

              type="button"
              onClick={handleSkip}


            >
              Skip
            </Button>
            <Button
            variant="secondary"
              type="submit"
              disabled={loading}

            >
              {loading ? "Saving..." : "Save & Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationInfo;
