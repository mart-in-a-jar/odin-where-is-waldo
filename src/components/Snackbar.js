import MuiSnackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

const Snackbar = ({ text, duration, color, display, hide }) => {
    return (
        <MuiSnackbar
            open={display}
            onClose={() => {
                hide(false);
            }}
            autoHideDuration={duration}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <SnackbarContent
                style={{ backgroundColor: color }}
                message={text}
                sx={{minWidth: "200px !important"}}
            />
        </MuiSnackbar>
    );
};

export default Snackbar;
