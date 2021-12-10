import { Form } from "react-bootstrap";


function ChoiceField(props) {
    return (
        <Form.Group>
            <Form.Label>
                {props.label} {props.required ? "*" : ""}
            </Form.Label>

            <Form.Text className="text-muted error">
                {props.error ? props.error : null}
            </Form.Text>

            <Form.Control
                as="select"
                onChange={props.handleChange}
                name={props.name}
                value={props.value ? props.value : ""}
                required={props.required}
                custom
            >
                <option value="">Select</option>
                {props.choices
                    ? props.choices.map((choice) => {
                        return (
                            <option key={choice.value} value={choice.value}>
                                {choice.display_name}
                            </option>
                        );
                    })
                    : null}
            </Form.Control>
        </Form.Group>
    );
}

export default ChoiceField;