import { useContext, useState } from "react";
import { SelectBUtton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereactarea";
import { Button } from "primereact/button";

import { CustomerRefreshContext } from "../context";
import CustomerService from "../service";
import { ToastContext } from "../../../providers/ToastProvider";

const customerService = new CustomerService();

export default function CustomerOutcome() {
    

}