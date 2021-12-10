import { useState, useContext, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Card } from "primereact/card";
import { IoLocationSharp } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { hasPermission } from "../../permissions";
import { DataTable } from "primereact/datatable";
import CustomerService from "../service";
import { connect } from "react-redux";
import { ToastContext } from "../../providers/ToastProvider";
import {AddPermissionDialog, AdditionalContactForm} from "../contact/";

const customerService = new CustomerService();




function ContactTable({
    contacts,
    options,
    user,
    leftToolbarTemplate,
    showAsCard,
    getContacts,
}) {

    const dt = useRef(null);
    const toast = useContext(ToastContext);

    const [globalFilter, setGlobalFilter] = useState(null);
    const [showPermDialog, setShowPermDialog] = useState(false);
    const [showEditContact, setShowEditContact] = useState(false);

    const [selectedContactUsers, setSelectedContactUsers] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

    let columnList = [
        { field: "contact_name", header: "Contact Name" },
        { field: "designation", header: "Designation" },
        { field: "email", header: "Email" },
        { filed: "phone", header: "Phone" },
        { field: "country_name", header: "Country Name" }
    ];

    const columnComponents = columnList.map((col) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
      });


    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    className="p-mr-2"
                    onClick={() => {
                        setSelectedContactUsers(rowData.users);
                        setSelectedContact(rowData);
                        setShowEditContact(true);
                    }}
                ></Button>

                {hasPermission(user, ["Admin", "CEO", "Manager"]) ? (
                    <Button
                        icon="pi pi-users"
                        onClick={() => {
                            setSelectedContactUsers(rowData.users);
                            setSelectedContact(rowData);
                            setShowEditContact(true);
                        }}
                    ></Button>
                ) : null}
            </>
        );
    };

    const rightToolbarTemplate = (
        <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="search"
        />
    );

    const contactPersonCardTemplate = (rowData) => {
        return (
            <Card title={rowData.contact_name} subTitle={rowData.designation}>
                <HiOutlineMail /> {rowData.email} | <AiOutlinePhone /> {rowData.phone} {" "}
                <br></br>
                <IoLocationSharp /> {rowData.location} <br></br>
                <span
                    className={`flag icon flag-icon-${rowData.country.toLowerCase()}`}
                    width={30}
                ></span>{" "}
                {rowData.country_name}
            </Card>
        );
    };

    const updateContact = (data) => {
        let success = 1;

        customerService
            .updateCustomerContact(data.id, data)
            .then(() => {
                toast.showsuccess("Updated");
                getContacts();
            })
            .catch((_) => {
                toast.showWarning("Error updating contact")
                success = 0;
            });

            return success;
    }

 

    return (
        <div>
            <Toolbar left={leftToolbarTemplate} right={rightToolbarTemplate} />

            <DataTable
                ref={dt}
                value={contacts}
                emptyMessage="no additional contact"
                globalFilter={globalFilter}
                className="data-table-y-scroll"
            >
                {showAsCard ? (
                    <column
                        field="contact_name"
                        header="contact"
                        body={contactPersonCardTemplate}
                    />
                ) : (
                    columnComponents
                )}
                <Column
                    header="Action"
                    body={actionBodyTemplate}
                    headerStyle={{ width: "8em", textAlign: "center" }}
                    bodyStyle={{ textAlign: "center", overflow: "visible" }}
                />
            </DataTable>

            <AddPermissionDialog
                visible={showPermDialog}
                onHide={() => setShowPermDialog(false)}
                contact={selectedContact}
                allUsers={options.users}
                currentPermUsers={selectedContactUsers}
            />

            <AdditionalContactForm
                visible={showEditContact}
                contact={selectedContact}
                onSubmit={updateContact}
                onHide={() => setShowEditContact(false)}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(ContactTable);