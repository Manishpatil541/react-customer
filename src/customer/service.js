
import axios from "../axiosInstance";


export default class CustomerService {
    getCustomerList = (urlParam = null) => {
        const token = localStorage.getItem("access")
        if (urlParam) {
            return axios.get(`/api/customer/${urlParam}`,
                { headers: { "Authorization": `JWT ${token}` } }
                // {
                //     "Authorization": `Be ${token}`,
                // }
            ).then((res) => res.data);
        } else {
            return axios.get("/api/customer",
                { headers: { "Authorization": `JWT ${token}` } }
            ).then((res) => res.data);
        }
    };

    getIndustryList = () => {
        const token = localStorage.getItem("access")
        return axios.get("/api/industry/",
            { headers: { "Authorization": `JWT ${token}` } }
        ).then((res) => res.data);
    };

    getCustomerOptions = () => {
        const token = localStorage.getItem("access")
        return axios.options("/api/customer",
            { headers: { "Authorization": `JWT ${token}` } }
        ).then((response) => {
            return {
                options: response.data.actions.POST,
                default: response.data.default,
            };
        });
    };

    addCustomer = (data) => {
        const token = localStorage.getItem("access")
        return axios.post("/api/customer/",
            { headers: { "Authorization": `JWT ${token}` }, body: data })
            .then((res) => res.data);
    };

    updateCustomer = (id, data) => {
        const token = localStorage.getItem("access")

        return axios.put(`/api/customer/${id}/`, data)
            .then((res) => res.data);
    };

    patchCustomer = (id, data) => {
        const token = localStorage.getItem("access")
        return axios.patch(`/api/customer/${id}/`,
            { headers: { "Authorization": `JWT ${token}` } },
            data).then((res) => res.data);
    };

    getCustomerDetail = (id) => {
        const token = localStorage.getItem("access")
        return axios.get(`/api/customer/${id}`,
            { headers: { "Authorization": `JWT ${token}` } }
        ).then((res) => res.data);
    };

    getCustomerContactOptions = () => {
        const token = localStorage.getItem("access")
        return axios.options("api/customer-contact",
            { headers: { "Authorization": `JWT ${token}` } }
            ).then((res) => res.data.actions.POST);
    };

    getCustomerContact = (customerId) => {
        const token = localStorage.getItem("access")
        let apiUrl = "api/customer-contact/";
    
        if (customerId) {
          apiUrl = `api/customer-contact/?customer=${customerId}`;
        }
        return axios.get(apiUrl, 
            { headers: { "Authorization": `JWT ${token}` } }
            ).then((res) => res.data);
      };

      addCustomerContact = (data) => {
        const token = localStorage.getItem("access")
        return axios.post("api/customer-contact/",
        { headers: { "Authorization": `JWT ${token}` } },
        data).then((res) => res.data);
      };
}