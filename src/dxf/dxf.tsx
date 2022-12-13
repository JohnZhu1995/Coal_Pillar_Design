/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import "./dxf.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import Grid from "@mui/material/Unstable_Grid2";
// import ThreeDxf from "three-dxf";

// var parser = new window.DxfParser();
// var dxf = parser.parseSync(fileReader.result);
// cadCanvas = new ThreeDxf.Viewer(
//     dxf,
//     document.getElementById("cad-view"),
//     400,
//     400
// );

const options = ["导出数据配置", "导出dxf"];

function dxf() {
    // const [cate, setAge] = React.useState("");
    // const [protecto, setAge] = React.useState("");
    const [exporto, setAge] = React.useState("");

    const handleChangeCate = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    const handleChangeProtect = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    const handleChangeExport = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number
    ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    // const manualOpen = false;

    return (
        <Box className="dxf">
            <Grid container spacing={0}>
                <Grid xs={4} md={3} className="left-wrap">
                    {/* dxf-writer */}
                    <div className="header">保护煤柱留设</div>

                    <div className="auto-panel">
                        <FormControl sx={{ m: 1 }} variant="outlined">
                            <InputLabel id="demo-simple-select-helper-label">
                                作图类型
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={exporto}
                                label="exporto"
                                onChange={handleChangeCate}
                            >
                                {/* <MenuItem value="">
            <em>None</em>
        </MenuItem> */}
                                <MenuItem value={10}>垂直剖面法</MenuItem>
                                <MenuItem value={20}>垂线法</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1 }} variant="outlined">
                            <InputLabel id="demo-simple-select-helper-label">
                                保护等级
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={exporto}
                                label="exporto"
                                onChange={handleChangeProtect}
                            >
                                {/* <MenuItem value="">
            <em>None</em>
        </MenuItem> */}
                                <MenuItem value={10}>I级</MenuItem>
                                <MenuItem value={20}>II级</MenuItem>
                                <MenuItem value={30}>III级</MenuItem>
                                <MenuItem value={40}>IV级</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            className="click-btn"
                            onClick={() => {
                                alert("clicked");
                            }}
                            variant="contained"
                            size="large"
                        >
                            导入配置
                        </Button>

                        <React.Fragment>
                            <ButtonGroup
                                variant="contained"
                                ref={anchorRef}
                                aria-label="split button"
                            >
                                <Button onClick={handleClick}>
                                    {options[selectedIndex]}
                                </Button>
                                <Button
                                    size="small"
                                    aria-controls={
                                        open ? "split-button-menu" : undefined
                                    }
                                    aria-expanded={open ? "true" : undefined}
                                    aria-label="select merge strategy"
                                    aria-haspopup="menu"
                                    onClick={handleToggle}
                                >
                                    <ArrowDropDownIcon />
                                </Button>
                            </ButtonGroup>
                            <Popper
                                sx={{
                                    zIndex: 1,
                                }}
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === "bottom"
                                                    ? "center top"
                                                    : "center bottom",
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener
                                                onClickAway={handleClose}
                                            >
                                                <MenuList
                                                    id="split-button-menu"
                                                    autoFocusItem
                                                >
                                                    {options.map(
                                                        (option, index) => (
                                                            <MenuItem
                                                                key={option}
                                                                disabled={
                                                                    index === 2
                                                                }
                                                                selected={
                                                                    index ===
                                                                    selectedIndex
                                                                }
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    handleMenuItemClick(
                                                                        event,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                {option}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </React.Fragment>
                    </div>

                    <Button
                        className="click-btn manual-btn"
                        onClick={() => {
                            alert("clicked");
                        }}
                        variant="contained"
                        size="large"
                        color="success"
                    >
                        手动输入
                    </Button>
                </Grid>
                <Grid xs={8} md={9} className="right-wrap">
                    {/* dxf-viewer */}
                    <div id="cad-view"></div>
                </Grid>
            </Grid>
            {/* <div className="left-wrap"></div>
            <div className="right-wrap"></div> */}
            {/* <div className="manual-panel" >
    <Box
        component="form"
        sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
    >
        <TextField
            id="x-axis"
            label="横轴x"
            variant="outlined"
        />
        <TextField
            id="y-axis"
            label="竖轴y"
            variant="outlined"
        />
        <TextField
            id="radius"
            label="半径"
            variant="outlined"
        />
    </Box>
    <Button
        className="click-btn"
        onClick={() => {
            alert("clicked");
        }}
        variant="contained"
        size="large"
    >
        作图
    </Button>
</div> */}
        </Box>
    );
}

export default dxf;
