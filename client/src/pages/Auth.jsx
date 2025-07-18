import React, { useState } from 'react';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">{isLogin ? 'Login' : 'Sign Up'}</h2>

      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn ${isLogin ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`btn ${!isLogin ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      <form className="mx-auto" style={{ maxWidth: '500px' }}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" required />
        </div>

        {!isLogin && (
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" required />
          </div>
        )}

        <button type="submit" className="btn btn-success w-100">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Auth;
