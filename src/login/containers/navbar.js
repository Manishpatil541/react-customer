
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';


const Navbar = () => {
    const items = [
        {
            label: 'Customers',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Customer List',
                    url: '/customer'
                },
                {
                    label: 'Customer Approval',
                    url: '/customer-approval'
                },
                {
                    separator: true
                },
                {
                    label: 'Rejected Customer',
                    icon: 'pi pi-fw pi-trash',
                    url: '/customer-rejected'
                }
            ]
        },


        {
            label: 'Misleneious',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archieve',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    const start =
        <a href="/navbar">
            <img alt="logo" src="images/smart_name.png" height="30" width="190" className="p-mr-2" onClick="/navbar"></img>
        </a>
    const end = <InputText placeholder="Search" type="text" />;

    return (
        <div>
            <div className="card">
                <Menubar model={items} start={start} end={end} />
            </div>
        </div>
    );
}

export { Navbar };