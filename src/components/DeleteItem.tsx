import { FormStepProps } from "../interface";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const delectIcon = {
  width: "40px",
  height: "2em",
  fontSize: "20px",
  color: "hsl(0deg 0% 0% / 38%)",
  padding: "10px",
  "&:hover": {
    backgroundColor: "#ffe0e0",
    color: "hsl(0deg 80% 61%)",
  },
} as const;

/**
 * Deletes an individual item in Form Steps
 *
 * Props:
 *    index: number,
 *    removeItem: Formik Helper
 * State: none
 *
 */
function DeleteItem({ index, removeItemCb }: FormStepProps) {
  return (
    <Button
      type="button"
      onClick={() => removeItemCb(index)}
      sx={{
        minWidth: "40px",
        mt: 1,
        padding: 0,
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      <DeleteIcon sx={delectIcon} />
    </Button>
  );
}

export default DeleteItem;
