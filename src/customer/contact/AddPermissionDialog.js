import { useState, useEffect, useCallback } from "react";
import { Dialog } from "primereact/dialog";
import { PickList } from "primereact/picklist";
import CustomerService from "../service";

const customerService = new CustomerService();
export default function AddPermissionDialog({
    visible,
    onHide,
    contact,
    allUsers = [],
    currentPermUsers = [],
}) {

    const [users, setUsers] = useState([]);
    const [hasPermissionUsers, setHasPermissionUsers] = useState([]);

    const onChange = useCallback(
        (event) => {
            //permission
            let userList = event.target.map((u) => u.value);
            let data = {
                users: userList,
            };

            customerService.updateCustomerContact(contact.id, data);

            setUsers(event.sourse);
            setHasPermissionUsers(event.target);
        },
        [contact]
    );

    useEffect(() => {
        setUsers(
            allUsers.choices.filter((u) => !currentPermUsers.includes(u.value))
        );
        setHasPermissionUsers(
            allUsers.choices.filter((u) => currentPermUsers.includes(u.value))
        );
    }, [allUsers, currentPermUsers]);

    const itemTemplate = (item) => {
        return <div>{item.display_name}</div>
    };

    return (
        <Dialog visible={visible} onHide={onHide}>
            <PickList
                sourse={users}
                target={hasPermissionUsers}
                itemTemplate={itemTemplate}
                sourseHeader="Users"
                targetHeader="Has Permission"
                showSourceControls={false}
                showTargetControls={false}
                sourseStyle={{ height: "342px" }}
                targetstyle={{ height: "342px" }}
                onChange={onChange}
            ></PickList>
        </Dialog>
    )
}