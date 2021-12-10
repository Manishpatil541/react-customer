import { useState, useEffect } from "react";
import {
    ListCustomer,
    ListProspectApproval,
    ListRejectedCustomer,
} from "../crud";

import { Badge } from "primereact/badge";
import { TabView, TabPanel } from "primereact/tabview";
import { CustomerOptionsContext } from "../context";
import CustomerService from "../service";

const customerService = new CustomerService();

function CustomerListPage() {
    const [approvalCustomerCount, setApprovalCustomerCount] = useState(0);
    const [customerOptions, setCustomerOptions] = useState(null);

    useEffect(() => {
        customerService
            .getCustomerOptions()
            .then((data) => setCustomerOptions(data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        customerService
            .getCustomerList(
                "?confirmed_addition=false&outcome=Waiting+for+Approval&limit=1"
            )
            .then((data) => setApprovalCustomerCount(data.count))
            .catch((err) => console.log(err));
    }, []);

    const approvalHeader = (
        <>
            Customer Approval{""}
            {approvalCustomerCount ? <Badge value={approvalCustomerCount} /> : null}
        </>
    );

    return (
        <CustomerOptionsContext.Provider value={customerOptions}>
            <div className="p-m-2">
                <TabView>
                    <TabPanel header="Rejected Customers">
                        <ListRejectedCustomer />
                    </TabPanel>
                    <TabPanel header="Customer List">
                        <ListCustomer />
                    </TabPanel>
                    <TabPanel header={approvalHeader}>
                        <ListProspectApproval />
                    </TabPanel>

                </TabView>
            </div>
        </CustomerOptionsContext.Provider>
    );
}

export { CustomerListPage };




