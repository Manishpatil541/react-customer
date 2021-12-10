
import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import CustomerService from '../service';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

const customerService = new CustomerService();

export function CustomerDetailNav() {

    const customerName = useLocation();


    const { name,country }= customerName.state
    




    return (
        <>
            <div>
                <h1>{name}</h1>
                <h2>{country=== 'undefined' ? 'gokul' : country }</h2>
            </div>
            <Divider />
            <div>
                <button class="btn btn-primary mr-4 d-inline" onClick={(e) => {
                    e.preventDefault(); window.location.href = "/edit-customer";
                }}>Edit Customer</button>

                <button class="btn btn-secondary mr-4 d-inline" >Additional Contacts</button>
            </div>
            <Divider />
        </>
    )
}


