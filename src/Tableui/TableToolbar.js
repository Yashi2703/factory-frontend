import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function TableToolbar({
    title
}) {

    return (
        <>
            <Toolbar
                className="toolbar"
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h5" id="tableTitle" component="div">
                    {title}
                </Typography>
            </Toolbar>
        </>
    );
}
