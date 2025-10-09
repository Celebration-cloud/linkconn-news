/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
export default function JobApplicationEmail({ name, email, message, cv, job }) {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-blue-700 mb-4">
          New Job Application: {job}
        </h2>

        <div className="space-y-2 text-gray-800">
          <p>
            <span className="font-semibold">Name:</span> {name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold">Message:</span> {message}
          </p>
        </div>

        <hr className="my-6 border-gray-200" />

        <div>
          <p className="font-semibold">CV/Portfolio:</p>
          <a
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-words"
          >
            {cv}
          </a>
        </div>

        <hr className="my-6 border-gray-200" />

        <p className="text-xs text-gray-500 text-center">
          Sent via Linkcon News Careers
        </p>
      </div>
    </div>
  );
}
