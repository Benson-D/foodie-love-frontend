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

function InputField(props: InputProps) {
    const { ...rest } = props; 
    const [field, meta] = useField(props);

    return (
        <TextField
            fullWidth
            variant="standard"
        {...field}
        {...rest} />
    )
}

export default InputField; 