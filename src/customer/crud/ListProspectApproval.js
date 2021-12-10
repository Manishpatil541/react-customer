import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Navbar } from '../../login/containers/navbar';



import CustomerService from "../service";
import { UserContext } from "../../providers/UserProvider";
import { ToastContext } from "../../providers/ToastProvider";


const customerService = new CustomerService();

export function ListProspectApproval() {
    const [customers, setCustomers] = useState(null);
    const history = useNavigate();

    const user = useContext(UserContext);

    const toast = useContext(ToastContext);

    const dt = useRef(null);

    useEffect(() => {
        customerService
            .getCustomerList("?confirmed_addition=False&outcome=Waiting+for+Approval")
            .then((data) => setCustomers(data))
            .catch((_) => toast.showWarnig("There was an error fetching data"))
    }, []);

    // const assignToBodyTemplate = (rowData) => {
    //     return <ChangeAssignedTo cutomer={rowData} />;
    // };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                {/* {user.hasPermission(["CEO", "Admin"]) ? (
                    <ApproveRejectCustomerButton customer={rowData} />
                ) : null} */}
                <Button
                    type="button"
                    onClick={(_) => history.push(`/customer/${rowData.id}`)}
                    className="p-button-secondary p-mr-2 p-mb-2 p-button-sm"
                >
                    View customer
                </Button>
            </>
        );
    };



    return (
        <>
        <Navbar/>
        <Card title="Prospects Waiting for Approval">
            <DataTable
                ref={dt}
                value={customers}
                emptyMessage="No customers for approval"
                paginator
                rows={2}
                className="data-table-y-scroll"
            >
                <Column header="Customer Name" field="customer" />
                <Column header="Country" field="country" />
                <Column header="Location" field="location" />
                <Column header="Contact Person" field="contact_person" />
                <Column
                    header="Area of specialization"
                    field="area_of_specialization"
                />
                {/* {user.hasPermission(["CEO", "Admin"]) ? (
                    <Column header="Assigned To" body={assignToBodyTemplate} />
                ) : null} */}
                <Column body={actionBodyTemplate} />
            </DataTable>
        </Card>
        </>
    )
};