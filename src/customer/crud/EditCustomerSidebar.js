import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CustomerService from "../service";
import { ToastContext } from "../../providers/ToastProvider";
import { useFormData } from "../../common/index";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from "primereact/checkbox";


const customerService = new CustomerService();

function EditCustomerSidebar({ customer }) {

    const [options, setOptions] = useState({
        country: { choices: [] },
        industry: { choices: [] },
    });

    const getOptions = () => {
        customerService
            .getCustomerOptions()
            .then((data) => {
                setOptions(data.options);
            })
            .catch((_) => toast.showWarning("There was an error in fetching data"));
    };

    useEffect(() => {
        getOptions();
    }, []);

    const [editing, setEditing] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const toast = useContext(ToastContext);
    let history = useNavigate();

    const [customerDetails, setCustomerDetails, handleOnChange] = useFormData(customer);

    useEffect(() => {
        setCustomerDetails(customer)
    }, [customer])

    const updateCustomer = (e) => {
        customerService
            .updateCustomer(customer.id, customerDetails)
            .then((_) => toast.showSuccess("Successfully Updated"))
            .catch((_) => toast.showWarning("There was an error in Updating Customer")
            );

        setEditing(false);
        e.preventDefault();

    };

    const customerEditHeader = (
        <div>
            <div className="p-text-right">
                <Button
                    label="Save"
                    icon="pi pi-check"
                    className="p-button-text"
                    type="submit"
                    disabled={!editing}
                />
                <Button
                    label="Edit"
                    icon="pi pi-edit"
                    className="p-button-text"
                    type="button"
                    disabled={editing}
                    onClick={() => setEditing(true)}
                />

            </div>
        </div>
    );

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <span
                        className={`flag-icon flaf-icon-${option.value.toLowerCase()}`}
                        width={30}
                    ></span>
                    <span> {option.display_name} </span>
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
                <div>{option.dispaly_name}</div>
            </div>
        );
    };

    const updateCustomerForm = (
        <>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12">
                    <label htmlFor="customer"> Customer Name * </label>
                    <InputText
                        id="customer"
                        name="customer"
                        value={customerDetails && customerDetails.customer}
                        onChange={handleOnChange}
                        type="text"
                        disabled={!editing}
                        required
                    />
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="country"> Country * </label>
                    <Dropdown
                        id="country"
                        name="country"
                        value={customerDetails.country}
                        onChange={handleOnChange}
                        options={options.country.choices}
                        optionLabel="dispaly_name"
                        optionValue="value"
                        filter
                        showClear
                        filterBy="display_name"
                        placeholder="Select a Country"
                        className={!customerDetails.country && submitted ? "p-invalid" : ""}
                        valueTemplate={selectedCountryTemplate}
                        itemTemplate={countryOptionTemplate}
                        disabled={!editing}
                        required
                    />
                </div>
                <div className="p-col-12">
                    <label htmlFor="location"> Location * </label>
                    <InputText
                        id="location"
                        name="location"
                        value={customerDetails.location}
                        onChange={handleOnChange}
                        type="text"
                        disabled={!editing}
                        required
                    />
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="contact_email">Contact Email *</label>
                    <InputText
                        id="contact_email"
                        name="contact_email"
                        value={customerDetails.contact_email}
                        onChange={handleOnChange}
                        type="email"
                        disabled={!editing}
                        required
                    />
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="contact_number">Contact Number</label>
                    <InputText
                        id="contact_number"
                        name="contact_number"
                        value={
                            customerDetails.contact_number
                                ? customerDetails.contact_number
                                : ""
                        }
                        onChange={handleOnChange}
                        type="string"
                        disabled={!editing}
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
                        disabled={!editing}
                        required
                    />
                </div>
                <div className="p-field p-col-12">
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
                        disabled={!editing}
                        required
                    />
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="website">Website *</label>
                    <InputText
                        id="website"
                        name="website"
                        value={customerDetails.website}
                        onChange={handleOnChange}
                        type="url"
                        placeholder="https://example.com"
                        disabled={!editing}
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
                        disabled={!editing}
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
                        disabled={!editing}
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
                        disabled={!editing}
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
                        disabled={!editing}
                    />
                </div>
            </div>
        </>
    );

    return (
        <div>
            <form onSubmit={updateCustomer} onInvalid={() => setSubmitted(true)}>
                {customerEditHeader}
                <Divider />
                {updateCustomerForm}
            </form>
        </div>
    );
}


export { EditCustomerSidebar };