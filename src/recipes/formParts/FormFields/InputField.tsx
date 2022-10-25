import { useField } from 'formik';
import { TextField } from '@mui/material';

interface IconProps {
    endAdornment: JSX.Element;
}

interface InputProps {
    name: string; 
    label: string;
    type?: string;
    InputProps?: IconProps;
}

interface ConfigAttributes extends InputProps {
    fullWidth: boolean;
    helperText: string;
    error: boolean
}

function InputField(props: InputProps) {
    const { ...rest } = props; 
    const [field, meta] = useField(props);

    const configInputAttribute: ConfigAttributes = {
        ...rest,
        fullWidth: true,
        helperText: '',
        error: false
    }

    if (meta.touched && meta.error) {

        console.log(meta.touched, meta.error, props.name);
        configInputAttribute.error = true;
        configInputAttribute.helperText = meta.error;
    }

    return (
        <TextField
            variant="standard"
        {...configInputAttribute}
        {...field} />
    )
}

export default InputField; 