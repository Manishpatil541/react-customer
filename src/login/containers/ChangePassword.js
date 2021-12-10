import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { change_password}  from "../actions/auth";
import { Navigate } from  "react-router-dom";
import { ToastContext } from "../../providers/ToastProvider";

const ChangePassword = ({ change_password }) => {

    const [requestSent, setRequestSent] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [, setExecutionOutput] = useState("");
    const toast = useContext(ToastContext);

    const [formData, setFormData] = useState({
        new_password: "",
        re_new_password: "",
        current_password: "",
    });

    const {new_password, re_new_password, current_password} = formData;

    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        change_password(new_password, re_new_password, new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to="/login" />;
    }

    function getPassword() {
        try {
            if (new_password !== re_new_password) {
                throw new Error("Password Not Matching");
            }
            setExecutionOutput(new_password, re_new_password, current_password);
            toast.showSuccess("Your Password Successfully Changed");
            } catch {
                setHasError(true);
                toast.showWarning("Password Error");
            }
        }

    return (
        <div>
            {!hasError && (
                <div className="container mt-5">
                    <h1>Change Your Password</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Current Password"
                                name="current_password"
                                value={current_password}
                                onChange= {(e) => onChange(e)}
                                minLength="6"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                placeholder="New Password"
                                name="new_password"
                                value={new_password}
                                onChange={(e) => onChange(e)}
                                minLength="6"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Confirm New Password"
                                name="re_new_password"
                                value={re_new_password}
                                onChange={(e) => onChange(e)}
                                minLength="6"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={getPassword}>
                            Submit
                        </button>
                    </form>
                </div>
            )}
            {hasError && <ErrorComponent/>}
        </div>
    );
};

function ErrorComponent() {
    return <h1>Password Not Matching</h1>;
}

export default connect(null, { change_password })(ChangePassword);