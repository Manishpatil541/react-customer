import { Form } from "react-bootstrap";

export function Checkbox(props) {
    return (
        <Form.Group>
            <Form.Check
                type="checkbox"
                label={props.lable}
                name={props.name}
                onChange={props.handleChange}
                checked={props.value ? props.value : false}
                required={props.required}
            />
            <Form.Text className="text-muted error">
                {props.error ? props.error : null}
            </Form.Text>
        </Form.Group>
    );
}

export default Checkbox;