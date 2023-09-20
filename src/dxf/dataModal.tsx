import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 0.7,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function BasicModal(props: any) {
    // Modal
    const { openModal, handleCloseModal } = props;

    // form
    const [cate, setCate] = React.useState("");
    const [protecto, setProtecto] = React.useState("");

    const handleChangeCate = (event: SelectChangeEvent) => {
        setCate(event.target.value);
    };
    const handleChangeProtect = (event: SelectChangeEvent) => {
        setProtecto(event.target.value);
    };

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        手动输入配置
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, display: "flex" }}
                    >
                        <FormControl
                            sx={{ mb: 1, mr: "auto", width: 0.45 }}
                            variant="outlined"
                        >
                            <InputLabel id="demo-simple-select-helper-label">
                                作图类型
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={cate}
                                label="cate"
                                onChange={handleChangeCate}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>垂直剖面法</MenuItem>
                                <MenuItem value={20}>垂线法</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            sx={{ mb: 1, mr: "auto", width: 0.45 }}
                            variant="outlined"
                        >
                            <InputLabel id="demo-simple-select-helper-label">
                                保护等级
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={protecto}
                                label="protecto"
                                onChange={handleChangeProtect}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>I级</MenuItem>
                                <MenuItem value={20}>II级</MenuItem>
                                <MenuItem value={30}>III级</MenuItem>
                                <MenuItem value={40}>IV级</MenuItem>
                            </Select>
                        </FormControl>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
