import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {

    const {signinWithGoogle} = use(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleGoogleSignIn = () => {
    signinWithGoogle()
    .then(result =>{
        console.log('this is google signin', result);
        // create user in database 
        const newUser = {
            Name : result?.user?.displayName,
            Email : result?.user?.email,
            Image : result?.user?.photoURL
        }
        fetch("https://e-book-server-delta.vercel.app/users",{
            "method" : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data =>{
            console.log('data after save', data);
        })
    })
    .catch(error =>{
        console.log(error);
    })
  };

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content">
            Create an Account
          </h1>

          <p className="mt-2 text-sm text-base-content/60">
            Join us and start exploring amazing books
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-base-200 rounded-2xl p-6 sm:p-8 shadow-lg border border-base-300">
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Email Address</span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered w-full bg-base-100 focus:outline-none focus:border-primary"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-base-100 focus:outline-none focus:border-primary"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="input input-bordered w-full bg-base-100 focus:outline-none focus:border-primary"
                required
              />
            </div>

            {/* Register Button */}
            <button type="submit" className="btn btn-primary w-full text-white">
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-6 text-base-content/50">OR</div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full bg-base-100"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          {/* Already Have Account */}
          <div className="text-center mt-6">
            <p className="text-sm text-base-content/60">
              Already have an account?
            </p>

            <button
              type="button"
              className="mt-1 text-primary font-semibold hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
