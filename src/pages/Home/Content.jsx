import React from "react";

export const Content = () => (
  <div className="relative w-screen max-w-full space-y-10 z-50 border border-gray-300"> {/* Added border */}
    <div className="pt-16 pb-16 px-4"> {/* Vertical padding only */}
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg">
        Here is some information about our student chapter. We strive to provide
        the best opportunities and resources to our members...
      </p>
    </div>
    <div className="pt-16 pb-16 px-4">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg">
        Here is some information about our student chapter. We strive to provide
        the best opportunities and resources to our members...
      </p>
    </div>
    <div className="pt-16 pb-16 px-4">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg">
        Here is some information about our student chapter. We strive to provide
        the best opportunities and resources to our members...
      </p>
    </div>
    <div className="pt-16 pb-24 px-4"> {/* Extra padding-bottom for the last section */}
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg">
        Here is some information about our student chapter. We strive to provide
        the best opportunities and resources to our members...
      </p>
    </div>
  </div>
);
