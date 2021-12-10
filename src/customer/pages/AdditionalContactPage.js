import React, { useState, useEffect, useContext, useCallback } from "react";
import { Button } from "primereact/button";

import { AdditionalContactForm, ContactTable } from "../contact";
import CustomerService from "../service";
import { ToastContext } from "../../providers/ToastProvider";

const customerService = new CustomerService();

function AdditionalContactPage() {

    const [contacts, setContacts] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [contactOptions, setContactOptions] = useState({
        users: { choices: [] },
    });

    const toast = useContext(ToastContext);

    const getContacts = useCallback(() => {
        customerService
            .getCustomerContact()
            .then((data) => setContacts(data))
            .catch((_) => toast.showWarning("Error fetching data"));
    }, [toast]);

    useEffect(() => {
        getContacts();

        customerService
            .getCustomerContactOptions()
            .then((data) => setContactOptions(data))
            .catch((_) => toast.showWarning("Error fetching data"));
    }, [getContacts, toast]);

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button
                    lable="New Contact"
                    icon="pi pi-plus"
                    className="p-button-success p-mr-2"
                    onClick={() => setShowDialog(true)}
                />
            </>
        );
    };

    const addCustomerContact = (data) => {
        let success = 1;

        customerService
            .addCustomerContact(data)
            .then(() => {
                toast.showWarning("Added a contact");
                getContacts();
            })
            .catch((_) => {
                toast.showWarning("error addding contact");
                success = 0;
            });

        return success;
    };

    return (
        <>
            <AdditionalContactForm
                visible={showDialog}
                onHide={() => setShowDialog(false)}
                onSubmit={addCustomerContact}
                showCustomer
                addContact
            />
            
            <ContactTable
                contacts={contacts}
                options={contactOptions}
                leftToolbarTemplate={leftToolbarTemplate}
                className="p-m-12"
                getContacts={getContacts}
            />
        </>
    )
}

export { AdditionalContactPage };