import { useCallback, useState } from "react";
// import { Form } from "react-bootstrap";
// import { DateField, Checkbox, ChoiceField } from ".";

// import  "./field.css";

export function useFormData(initialData) {

    const [formData, setFormData] = useState(initialData);

    // useEffect(() => {
    //     setFormData(initialData)
    // }, [initialData])

    const onChange = useCallback((e) => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setFormData((formData) => {
            return {
                ...formData,
                [name]: value,
            };
        });
    }, []);

    return [formData, setFormData, onChange];
}

