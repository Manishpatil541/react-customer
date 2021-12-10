import React, { useState, useContext } from 'react';
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { ToastContext } from "../../providers/ToastProvider"
import Header from "../../home/Header/Header";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const toast = useContext(ToastContext);
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password).then((success) => {
      if (!success) {
        toast.showWarning(
          "There was an error, please check email and password"
        );
      }
    });
  };

  if (isAuthenticated) {
    toast.showSuccess("Login Successfully");
    return <Navigate to="/navbar" />;
  }

  return (
    <>
      <Header />

      <div className="container text_center mt-5">
        <h1 className="mb-5">Log In</h1>
        <form
          onSubmit={(e) => onSubmit(e)}
          style={{ maxWidth: "800px", marginLeft: "9rem" }}
        >
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
        <p className="mt-3">
          <span className="ml-2 d-inline-flex text-danger">
            <Link to="/reset-password">Reset Password</Link>
          </span>
        </p>

        <p className="mt-3"></p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);




// const Login = ({ login, isAuthenticated }) => {

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const toast = useContext(ToastContext);
//   const { email, password } = formData;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = (e) => {
//     e.preventDefault();

//     login(email, password).then((success) => {
//       if (!success) {
//         toast.showWarning(
//           "There was an error, please check email and password"
//         );
//       }
//     });
//   };

//   if (isAuthenticated) {
//     toast.showSuccess("Login Successfully");
//     return <Navigate to="/" />;
//   }


//   return (
//     <>
//       <div className="container text_center mt-5">
//         <h1 className="mb-5">Log In</h1>
//         <form
//           onSubmit={(e) => onSubmit(e)}
//           style={{ maxWidth: "800px", marginLeft: "9rem" }}
//         >
//           <div className="form-group">
//             <input
//               className="form-control"
//               type="email"
//               placeholder="Email"
//               name="email"
//               onChange={(e) => onChange(e)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               className="form-control"
//               type="password"
//               placeholder="Password"
//               name="password"
//               onChange={(e) => onChange(e)}
//               minLength="6"
//               required
//             />
//           </div>
//           <button className="btn btn-primary" type="submit">
//             Login
//           </button>
//         </form>
//         <p className="mt-3">
//           <span className="ml-2 d-inline-flex text-danger">
//             <Link to="/reset-password">Reset Password</Link>
//           </span>
//         </p>

//         <p className="mt-3"></p>
//       </div>
//     </>
//   );
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.isAuthenticated,
// });

// export default connect(mapStateToProps, { login })(Login);