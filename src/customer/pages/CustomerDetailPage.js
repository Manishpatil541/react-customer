import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Panel } from 'primereact/panel';
import { TabPanel, TabView } from 'primereact/tabview';

import CustomerService from '../service';
import { CustomerRefreshContext } from "../context";
import { EditCustomerSidebar } from '../crud/EditCustomerSidebar';

import { AdditionalContactPage } from "./AdditionalContactPage";



const customerService = new CustomerService();
export function CustomerDetailPage() {

    const { customerId } = useParams();
    const [customer, setCustomer] = useState();


    const getCustomer = () => {
        customerService
            .getCustomerDetail(customerId)
            .then((data) => setCustomer(data));
    };

    useEffect(() => {
        customerService
            .getCustomerDetail(customerId)
            .then((data) => setCustomer(data));
    }, [customerId]);


    return (
        <CustomerRefreshContext.Provider
            value={{ getCustomer: getCustomer, customer: customer }}
        >
            {customer ?
                <div className="p-grid">
                    <div className="p-col-12 p-md-3 p-lg-3">
                        <Panel header="Customer Detail">
                            <EditCustomerSidebar customer={customer} />
                        </Panel>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-6">
                        <TabView className="p-mt-2">
                            {/* <TabPanel header="Stages">
                            {customer.confirmed_addition ? (
                                <StagePanel customer={customer} />
                            ) : (
                                <strong>Can't edit stage. Customer {customer.outcome}</strong>
                            )}
                        </TabPanel> */}
                            <TabPanel header="Additional Contacts">
                                <AdditionalContactPage />
                            </TabPanel>
                        </TabView>
                    </div>
                </div> : "Noooooooooooooo"}

        </CustomerRefreshContext.Provider>
    );
}