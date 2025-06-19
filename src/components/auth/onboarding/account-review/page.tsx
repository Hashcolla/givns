import GlowedRadioButton from "@/components/auth/GlowedRadioButton";
import React from "react";

const AccountReviewPage = () => {
  return (
    <div
      className={`min-w-[var(--register-form-width)] transition-all duration-300`}
    >
      <h1 className="text-foreground mt-20 text-2xl font-semibold">
        Under review
      </h1>
      <p className="text-secondary">Here's thebrief descript</p>
      <div className="mt-10"></div>
      <div className="flex flex-col space-y-3">
        <GlowedRadioButton name="d" label="Personal" defaultChecked />
        <GlowedRadioButton name="d" label="Organization" />
      </div>
    </div>
  );
};

export default AccountReviewPage;
