import { useEffect, useState, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Navbar } from "../../login/containers/navbar";


// import { MultiSelect } from "primereact/multi-select";

import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import CustomerService from "../service";
import AddCustomerDialog from "./AddCustomerDialog";
// import DataTableSkeleton from "../../../common/DataTableSkeleton";
import { ToastContext } from "../../providers/ToastProvider";
// import CustomerImportButton from "../import/CustomerImportButton";
import { classNames } from 'primereact/utils';

const tableHeaderStyle = {
    display: "flex",
    alignItem: "center",
    justifyContent: "space-between",
    flexWarp: "wrap",
};
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const customerService = new CustomerService();

export function ListCustomer(props) {
    let query = useQuery();

    const [customers, setCustomers] = useState([]);



    const [selectedCustomers, setSelectedCustomers] = useState(null);



    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [last, setLast] = useState(rows);
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");
    const [totalCount, setTotalCount] = useState();
    const [prevDisable, setPrevDisable] = useState(false);
    const [nextDisable, setNextDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    const [first1, setFirst1] = useState(0);
    const [row1, setRows1] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputToolTip] = useState('Press \'Enter\' key to go this page.');

    const [filters, setFilters] = useState({
        current_stage: {
            value: query.get("stage") || "",
        },
    });

    const [showAddCustomerDialog, setShowAddCustomerDailog] = useState(false);


    const dt = useRef(null);
    const toast = useContext(ToastContext);


    const customerList = (parms) => {
        setLoading(true);
        customerService
            .getCustomerList(parms)
            .then((data) => {
                setTotalCount(data.count);
                setNextUrl(data.next);
                setPrevUrl(data.privious);
                data.next == null ? setNextDisable(true) : setNextDisable(false);
                data.previous === null ? setPrevDisable(true) : setPrevDisable(false);
                setCustomers(data.results);
                setLoading(false);
            })
            .catch((_) => toast.showWarning("There was an error in fetching data"));
    };

    useEffect(() => {
        customerList(`?limit=${rows}`);
    }, [rows]);

    const searchCustomer = (term) => {
        const searchUrl = `?confirmed_addition=true&limit=${rows}&search=${term}`;
        customerService
            .getCustomerList(searchUrl)
            .then((data) => {
                setTotalCount(data.count);
                setNextUrl(data.next);
                setPrevUrl(data.previous);
                data.next == null ? setNextDisable(true) : setNextDisable(false);
                data.previous === null ? setPrevDisable(true) : setPrevDisable(false);
                setCustomers(data.results);
                setLoading(false);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    toast.showError("There was a error in fetching data");
                }
                toast.showWarning("There wa an error fetching data");
            });
    };

    const onCustomPage = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        setLast(event.rows);
    };

    const customTemplate = {
        layout: "RowsPerPageDropdown PrevPageLink NextPageLink",


        RowsPerPageDropdown: (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 },
                { label: "All", value: totalCount },
            ];
            return (
                <Dropdown
                    value={options.value}
                    options={dropdownOptions}
                    onChange={options.onChange}
                    appedTo={document.body}
                />
            );
        },

        PrevPageLink: () => {
            const onPrevClick = () => {
                let url = prevUrl.split("http://127.0.0.1:8080/api/customer/")[1];
                setFirst(first - rows);
                setLast(last - rows);
                customerList(url);
            };

            return (
                <button type="button" onClick={onPrevClick} disabled={prevDisable}>
                    <span className="p-p-3">Prev</span>
                </button>
            );
        },

        NextPageLink: () => {
            const onNextClick = () => {
                let url = nextUrl.split("http://127.0.0.1:8080/api/customer/")[1];
                setFirst(first + rows);
                setLast(last + rows);
                customerList(url);
            };

            return (
                <button type="button" onClick={onNextClick} disabled={nextDisable}>
                    <span className="p-p-3">Next</span>
                </button>
            );
        },
    };



    const countryBodyTemplate = (rowData) => {
        return (
            <>
                <span
                    className={`flag-icon flag-icon-${rowData.country.toLowerCase()}`}
                    width={30}>
                </span>
                <span className="image-text"> {rowData.country_name} </span>
            </>
        );
    };

    const contactBodyTemplate = (rowData) => {
        return (
            <div>
                {rowData.contact_person.name}
                <br></br>
                {rowData.contact_email}
                <br></br>
                {rowData.contact_number}
            </div>
        );
    };

    const createdOnBodyTemplate = (rowData) => {
        return (
            <>
                <span>{new Date(rowData.created_on).toDateString()}</span>
            </>
        );
    };



    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button
                    lable="New"
                    icon="pi pi-plus"
                    className="p-button-success p-mr-2"
                    onClick={() => setShowAddCustomerDailog(true)}
                />
            </>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <>
                {/* <CustomerImportButton /> */}

                <Button
                    label="Export"
                    icon="pi pi-upload"
                    className="p-button-help"
                    onClick={exportCSV}
                />
            </>
        );
    };

    const customerNameTemplate = (rowData) => {
        return (
            <>
                <Link
                    to={`/customer/${rowData.id}`}
                    state={{name: `${rowData.customer}`,country:`${rowData.country}`}}
                >
                    {rowData.customer}
                </Link>
            </>
        );
    };

    const header = (
        <div className="table-header" style={tableHeaderStyle}>
            <h2 className="p-m-0">List of Customers</h2>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => searchCustomer(e.target.value)}
                    placeholder="Global Search"
                    className="p-mt-2 p-mt-md-0"
                />
            </span>
        </div>
    );

    const onCustomPage1 = (event) => {
        setFirst1(event.first);
        setRows1(event.rows);
        setCurrentPage(event.page + 1);
    }


    const onPageInputKeyDown = (event, options) => {
        if (event.key === 'Enter') {
            const page = parseInt(currentPage);
            if (page < 0 || page > options.totalPages) {
                // setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
            }
            else {
                const first = currentPage ? options.rows * (page - 1) : 0;

                setFirst1(first);
                // setPageInputTooltip('Press \'Enter\' key to go to this page.');
            }
        }
    }

    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    }


    return (
        <>
        <Navbar/>
        <div className="card">
            <Toolbar
                className="p-mb-0"
                left={leftToolbarTemplate}
                right={rightToolbarTemplate}
            ></Toolbar>
            {customers ? (
                <DataTable
                    ref={dt}
                    paginator
                    paginatorTemplate={customTemplate}
                    first={first}
                    rows={rows}
                    onPage={onCustomPage}
                    value={customers}
                    rowHover
                    header={header}
                    selection={selectedCustomers}
                    onSelectionChange={(e) => setSelectedCustomers(e.value)}
                    dataKey="id"
                    filters={filters}
                    onFilter={(e) => setFilters(e.filters)}
                    className="data-table-y-scroll"
                    paginatorClassName="p-jc-center"
                    loading={loading}
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3em" }}
                    ></Column>
                    <Column
                        field="customer"
                        header="Customer"
                        body={customerNameTemplate}
                        sortable
                    ></Column>
                    <Column field="outcome" header="Outcome" sortable></Column>
                    <Column
                        field="current_stage"
                        header="Current Stage"
                        sortable
                    ></Column>
                    <Column
                        field="country_name"
                        header="Country"
                        body={countryBodyTemplate}
                        sortable
                    />
                    <Column field="location" header="Location" sortable></Column>
                    <Column
                        field="contact_person"
                        header="Contact Person"
                        body={contactBodyTemplate}
                        sortable
                    ></Column>
                    <Column
                        field="industry_name"
                        header="Industry Name"
                        sortable
                    ></Column>
                    <Column
                        field="created_by_email"
                        header="Created By"
                        sortable
                    ></Column>
                    <Column
                        field="assigned_to_email"
                        header="Assigned To"
                        sortable
                    ></Column>
                    <Column
                        field="created_on"
                        header="Created On"
                        body={createdOnBodyTemplate}
                        sortable
                    ></Column>
                </DataTable>
            ) : (
                {/* <DataTableSkeleton columnCount={6} /> */ }
            )}

            {/* <AddCustomerDialog
                isVisible={showAddCustomerDialog}
                hideDialog={() => setShowAddCustomerDialog(false)}
            /> */}
        </div>
        </>
    );
}



export default ListCustomer;




