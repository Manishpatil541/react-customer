import { Form } from "react-bootstrap";

function DateField(props) {
    return (
        <Form.Group>
            <Form.Label>
                {props.label} {props.required ? "*" : ""}
            </Form.Label>

            <Form.Text className="text-muted error">
                {props.error ? props.error : null}
            </Form.Text>

            <Form.Control
                type="date"
                onChange={props.handleChange}
                name={props.name}
                value={props.value ? props.value : ""}
                required={props.required}
            />
        </Form.Group>
    );
}

export default DateField;