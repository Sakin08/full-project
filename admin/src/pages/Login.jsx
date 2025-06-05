import React, { useState } from 'react';

const Login = () => {
  const [state, setState] = useState('Admin');

  return (
    <form className="max-w-md mx-auto mt-20 p-8 border border-gray-300 rounded-lg shadow-md bg-white">
      <p className="text-3xl font-semibold mb-8 text-center text-gray-800">
        <span className="text-blue-600">{state}</span> Login
      </p>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
      >
        Login
      </button>

      <p className="mt-6 text-center text-gray-600">
        {state === 'Admin' ? (
          <>
            Doctor Login?{' '}
            <span
              onClick={() => setState('Doctor')}
              className="text-blue-600 cursor-pointer hover:underline"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') setState('Doctor') }}
            >
              Click here
            </span>
          </>
        ) : (
          <>
            Admin Login?{' '}
            <span
              onClick={() => setState('Admin')}
              className="text-blue-600 cursor-pointer hover:underline"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') setState('Admin') }}
            >
              Click here
            </span>
          </>
        )}
      </p>
    </form>
  );
};

export default Login;
