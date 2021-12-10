import React, { useState, useRef, useContext, useEffect } from "react";
import { useFormData } from "../../common";
import { InputText } from "primereact/inputtext"

import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ToastContext } from "../../providers/ToastProvider";
import CustomerService from '../service';

const customerService = new CustomerService();

export default function AdditionalContactForm({
    visible,
    onHide,
    onSubmit,
    contact,
    addContact = false,
    showCustomer = false,
}) {
    const [options, setOptions] = useState({
        country: { choices: [] },
        customer: { choice: [] },
    });

    const [contactDetails, setContactDetails, handleOnChange] = useFormData(
        contact
            ? contact
            : {
                customer: "",
                contact_name: "",
                designation: "",
                country: "",
                loaction: "",
                email: "",
                phone: "",
            }
    );

    const [submitted, setSubmitted] = useState(false);

    const dialogDivAppendRef = useRef(null);

    const toast = useContext(ToastContext);

    useEffect(() => {
        if (contact) {
            let c = contact;

            c.designation = c.designation ? c.designation : "";
            c.phone = c.phone ? c.phone : "";

            setContactDetails(c);
        }
    }, [contact]);

    useEffect(() => {
        customerService
        .getCustomerContactOptions()
        .then((data) => setOptions(data))
        .catch((_) => toast.showWarning("Error fetching data"));
    }, [toast]);



    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <span
                        className={`flag-icon flag-icon-${option.value.toLowerCase()}`}
                        width={30}
                    ></span>
                    <span> {option.dispaly_name} </span>
                </div>
            );
        }
        return <span> {props.placeholder} </span>
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <span
                    className={`flag-icon flag-icon-${option.value.toLowerCase()}`}
                    width={30}
                ></span>
                <div> {option.dispaly_name} </div>
            </div>
        );
    };

    const addCustomerContactForm = (
        <div style={{ width: "90vw" }}>
            <div className="p-fluid p-formgrid p-grid p-m-5">
                {showCustomer ? (
                    <div className="p-field p-col-12">
                        <label htmlFor="customer"> Customer Name *</label>
                        <Dropdown
                            id="customer"
                            name="customer"
                            value={contactDetails.customer}
                            onChange={handleOnChange}
                            options={options.customer.choices}
                            optionLabel="display_name"
                            optionValue="value"
                            className={
                                !contactDetails.customer && submitted ? "p-invalid" : ""
                            }
                            required
                        />
                    </div>
                ) : null}
                <div className="p-field p-col-12">
                    <label htmlFor="contact_name"> Contact Name * </label>
                    <InputText
                        id="contact_name"
                        name="contact_name"
                        value={contactDetails.contact_name}
                        onChange={handleOnChange}
                        type="text"
                        required
                    />
                </div>
                <div className="p-filed p-col-12">
                    <label htmlFor="country"> Country * </label>
                    <Dropdown
                        id="country"
                        name="country"
                        value={contactDetails.country}
                        onChange={handleOnChange}
                        options={options.country.choices}
                        optionLabel="display_name"
                        optionValue="value"
                        filter
                        showClear
                        filterBy="display_name"
                        placeholder="Select a Country"
                        className={!contactDetails.country && submitted ? "p-invalid" : ""}
                        valueTemplate={selectedCountryTemplate}
                        itemTemplate={countryOptionTemplate}
                        required
                    />
                </div>
                <div className="p-field p-col-12">
                    <label hrmlFor="location"> Location * </label>
                    <InputText
                        id="location"
                        name="location"
                        value={contactDetails.location}
                        onChange={handleOnChange}
                        type="text"
                        required
                    />
                </div>
                <div className="p-filed p-col-12">
                    <label htmlFor="designation"> Designation </label>
                    <InputText
                        id="designation"
                        name="designation"
                        value={contactDetails.designation}
                        onchange={handleOnChange}
                        type="text"
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="email"> Contact Email *</label>
                    <InputText
                        id="email"
                        name="email"
                        value={contactDetails.email}
                        onChange={handleOnChange}
                        type="email"
                        required
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="phone"> Contact Number </label>
                    <InputText
                        id="phone"
                        name="phone"
                        value={contactDetails.phone}
                        onChange={handleOnChange}
                        type="string"
                    />
                </div>
            </div>
        </div>
    );

    const formFooter = (
        <>
            <Button
                label="Close"
                icon="pi pi-times"
                className="p-button-text"
                onClick={onHide}
            />
            <Button
                label={addContact ? "Add" : "Update"}
                icon="pi pi-check"
                className="p-button-text"
                type="submit"
            />
        </>
    );

    const submitForm = async (e) => {
        e.preventDefault();

        let success = await onSubmit(contactDetails);

        if (success) {
            onHide();
            setContactDetails({
                customer: "",
                contact_name: "",
                designation: "",
                location: "",
                country: "",
                email: "",
                phone: "",
            });
        }
    };

    return (
        <form onSubmit={submitForm} onInvalid={() => setSubmitted(true)}>
            <div ref={dialogDivAppendRef}></div>


            <Dialog
                header="contact"
                appendTO={dialogDivAppendRef.current}
                visible={visible}
                onHide={onHide}
                footer={formFooter}
            >
                {addCustomerContactForm}
            </Dialog>
        </form>
    );
}