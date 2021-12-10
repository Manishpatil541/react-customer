import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Skeleton } from "primereact/skeleton";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import CustomerService from "../service";
// import { useFormData } from "../../../common/field";
import { ToastContext } from "../../providers/ToastProvider";



const customerService = new CustomerService();
function AddCustomerDialog({ isVisible, hideDialog }) {
    // initiatig options with empty array for choices to overcome *undefined error* 
    const [options, setOptions] = useState({
        country: { choices: [], },
        industry: { choices: [], }
    })
    const [customerDetails, setCustomerDetails, handleOnChange] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const dialogDivAppendRef = useRef(null);

    let history = useNavigate();
    const toast = useContext(ToastContext);

    const getOptions = () => {
        customerService
            .getCustomerOptions()
            .then((data) => {
                setOptions(data.options);
                setCustomerDetails(data.default);
            })
            .catch((_) => toast.showWarning("There was an error in fetching data"));
    };

    useEffect(() => {
        getOptions();
    }, []);

    const addCustomer = (e) => {
        customerService
            .addCustomer(customerDetails)
            .then((customer) => history.push("/customer/" + customer.id))
            .catch((_) => toast.showWarning("There was an error adding customer"));

        e.preventDefault();
    };

    const customerDialogFooter = (
        <>
            <Button
                label="Close"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
            />
            <Button
                label="Add"
                icon="pi pi-check"
                className="p-button-text"
                type="Submit"
            />
        </>
    );

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <span
                        className={`flag-icon flag-icon-${option.value.toLowerCase()}`}
                        width={30}
                    ></span>
                    <span> {option.display_name}</span>
                </div>
            );
        }

        return <span>{props.placeholder}</span>

    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <span
                    className={`flag-icon flag-icon-${option.value.toLowerCase()}`}
                    width={30}
                ></span>
                <div>{option.display_name}</div>
            </div>
        );
    };

    const addCustomerForm = (
        <>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12">
                    <label htmlFor="customer">Customer Name *</label>
                    <InputText
                        id="customer"
                        name="customer"
                        value={customerDetails.customer}
                        onChange={handleOnChange}
                        type="text"
                        required
                    />
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="country">Country *</label>
                    <Dropdown
                        id="country"
                        name="country"
                        value={customerDetails.country}
                        onChange={handleOnChange}
                        options={options.country.choices}
                        optionLabel="display_name"
                        optionValue="value"
                        filter
                        showClear
                        filterBy="display_name"
                        placeholder="Select a Country"
                        className={!customerDetails.country && submitted ? "p-invalid" : ""}
                        valueTemplate={selectedCountryTemplate}
                        itemTemplate={countryOptionTemplate}
                        required
                    />
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="location">Location *</label>
                    <InputText
                        id="location"
                        name="location"
                        value={customerDetails.location}
                        onChange={handleOnChange}
                        type="text"
                        required
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="contact_email">Contact Email *</label>
                    <InputText
                        id="contact_email"
                        name="contact_email"
                        value={customerDetails.contact_email}
                        onChange={handleOnChange}
                        type="email"
                        required
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="contact_number">Contact Number</label>
                    <InputText
                        id="contact_number"
                        name="contact_number"
                        value={customerDetails.contact_number}
                        onChange={handleOnChange}
                        type="string"
                    />
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="contact_person">Contact Person *</label>
                    <InputText
                        id="contact_person"
                        name="contact_person"
                        value={customerDetails.contact_person}
                        onChange={handleOnChange}
                        type="text"
                        required
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="industry">Industry *</label>
                    <Dropdown
                        id="industry"
                        name="industry"
                        value={customerDetails.industry}
                        onChange={handleOnChange}
                        options={options.industry.choices}
                        optionLabel="display_name"
                        optionValue="value"
                        className={
                            !customerDetails.industry && submitted ? "p-invalid" : ""
                        }
                        placeholder="Select an Industry"
                        required
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="website">Website *</label>
                    <InputText
                        id="website"
                        name="website"
                        value={customerDetails.website}
                        onChange={handleOnChange}
                        type="url"
                        placeholder="https://example.com"
                        required
                    />
                </div>
                <div className="p-field-checkbox p-col-12 p-md-6">
                    <Checkbox
                        name="is_india"
                        inputId="is_india"
                        value={true}
                        onChange={handleOnChange}
                        checked={customerDetails.is_india}
                    ></Checkbox>
                    <label htmlFor="is_india" className="p-checkbox-label">
                        Is India
                    </label>
                </div>
                <div className="p-field-checkbox p-col-12 p-md-6">
                    <Checkbox
                        name="is_lcr"
                        inputId="is_lcr"
                        value={true}
                        onChange={handleOnChange}
                        checked={customerDetails.is_lcr}
                    ></Checkbox>
                    <label htmlFor="is_lcr" className="p-checkbox-label">
                        Is LCR
                    </label>
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="area_of_specialization">Area of Specialization</label>
                    <InputTextarea
                        id="area_of_specialization"
                        name="area_of_specialization"
                        value={customerDetails.area_of_specialization}
                        onChange={handleOnChange}
                        type="text"
                        rows="4"
                    />
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="comments">Comments</label>
                    <InputTextarea
                        id="comments"
                        name="comments"
                        value={customerDetails.comments}
                        onChange={handleOnChange}
                        type="text"
                        rows="4"
                    />
                </div>
            </div>
        </>
    );

    const skeleton = (
        <>
            <Skeleton />
            <br></br>
            <Skeleton />
            <br></br>
            <Skeleton width="50%" />
        </>
    );


    return (
        <div>
            <form onSubmit={addCustomer} onInvalid={() => setSubmitted(true)}>

                {/* Append the dialog to this div */}
                <div ref={dialogDivAppendRef}></div>

                {/* Dialog should be appended to a div inside from */}
                <Dialog
                    keepInViewport
                    appendTo={dialogDivAppendRef.current}
                    visible={isVisible}
                    style={{ width: "90%" }}
                    footer={customerDialogFooter}
                    header="Customer Details"
                    modal
                    className="p-fluid"
                    onHide={hideDialog}
                >
                    {options ? addCustomerForm : skeleton}
                </Dialog>
            </form>
        </div>)
}


export default AddCustomerDialog;