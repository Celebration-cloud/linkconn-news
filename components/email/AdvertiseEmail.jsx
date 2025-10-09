/* eslint-disable react/prop-types */
import React from "react";

export default function AdvertisingEmail({ name, email, company, message }) {
  return (
    <div className="bg-gray-100 font-sans py-6">
      <div className="bg-white max-w-xl mx-auto rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-800 text-white text-center py-6">
          <h1 className="text-2xl font-bold">New Advertising Inquiry</h1>
          <p className="text-sm opacity-90 mt-1">
            A new request was submitted via your advertising portal
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-900">Name:</p>
            <p className="text-gray-700">{name}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-900">Email:</p>
            <p className="text-gray-700">{email}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-900">Company:</p>
            <p className="text-gray-700">{company}</p>
          </div>

          <hr className="border-gray-200 my-6" />

          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">Message:</p>
            <div className="bg-gray-100 rounded-md p-4 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
              {message}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center text-xs text-gray-500 py-4">
          <hr className="border-gray-200 mb-3" />
          <p>Sent via Linkcon News Advertising Portal</p>
        </div>
      </div>
    </div>
  );
}
