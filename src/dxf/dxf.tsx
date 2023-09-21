/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { useRef } from "react";
import "./dxf.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from "@mui/material/FormHelperText";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ClickAwayListener from "@mui/material/ClickAwayListener";
// import Grow from "@mui/material/Grow";
// import Paper from "@mui/material/Paper";
// import Popper from "@mui/material/Popper";
// import MenuList from "@mui/material/MenuList";
// import ThreeDxf from "three-dxf";
import Grid from "@mui/material/Unstable_Grid2";
import DataModal from "./dataModal";
import { DxfParser } from "dxf-parser";
import * as THREE from "three";
import helvetikerFont from "./helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
const ThreeDxf = require("three-dxf");


export default function dxf() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // progress.style.width = "0%";
        // progress.textContent = "0%";

        const file: File | undefined = event.target.files?.[0];
        const output: string[] = [];
        if (file) {
            output.push(
                "<li><strong>",
                encodeURI(file.name),
                "</strong> (",
                file.type || "n/a",
                ") - ",
                file.size.toString(),
                " bytes, last modified: ",
                file.lastModified
                    ? new Date(file.lastModified).toLocaleDateString()
                    : "n/a",
                "</li>"
            );
        }

        const fileDescription = document.getElementById("file-description");
        if (fileDescription) {
            fileDescription.innerHTML = `<ul>${output.join("")}</ul>`;
        }

        // $progress.classList.add("loading");
        if (file) {
            const reader = new FileReader();
            reader.onprogress = updateProgress;
            reader.onloadend = onSuccess;
            // reader.onabort = abortUpload;
            // reader.onerror = errorHandler;
            reader.readAsArrayBuffer(file);
        }
    };

    const updateProgress = (evt: ProgressEvent<FileReader>) => {
        console.log("updateProgress()");

        const loadingPersentage: number = Math.round(
            (evt.loaded / evt.total!) * 100
        );
        console.log("loadingPersentage: ", loadingPersentage);
        if (evt.lengthComputable) {
            const percentLoaded = Math.round((evt.loaded / evt.total!) * 100);
            if (percentLoaded < 100) {
                // progress.style.width = percentLoaded + "%";
                // progress.textContent = percentLoaded + "%";
            }
        }
    };

    // eslint-disable-next-line consistent-return
    const onSuccess = (evt: ProgressEvent<FileReader>) => {
        const fileReader = evt.target as FileReader;

        const fileContent: ArrayBuffer | null = fileReader.result as ArrayBuffer | null;
        if (fileReader.error) return console.log("error onloadend!?");
        // progress.style.width = "100%";
        // progress.textContent = "100%";
        setTimeout(function() {
            // $progress.classList.remove("loading");
        }, 2000);
        if (fileContent) {
            const parser = new DxfParser();
            const decoder = new TextDecoder();
            const dxfString = decoder.decode(fileContent);
            const dxfcontent = parser.parseSync(dxfString);

            const fontDataString = JSON.stringify(helvetikerFont);
            const blob = new Blob([fontDataString], {
                type: "application/json",
            });
            const fontUrl = URL.createObjectURL(blob);

            let font: any;
            let cadCanvas;
            const loader = new FontLoader();

            loader.load(fontUrl, function(response: any) {
                font = response;
                console.log("onSuccess()-loader", ThreeDxf);
                cadCanvas = new ThreeDxf.Viewer(
                    dxfcontent,
                    document.getElementById("cad-view"),
                    1000,
                    800,
                    font
                );
            });
        }
    };

    // ButtonGroup
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number
    ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen: any) => !prevOpen);
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
    // Modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <Box className="dxf">
            <Grid container spacing={0}>
                <Grid md={3} lg={2} className="left-wrap">
                    {/* dxf-writer */}
                    <div className="header">保护煤柱留设</div>

                    <div className="auto-panel">
                        <Button
                            className="click-btn"
                            onClick={handleFileSelect}
                            variant="contained"
                            size="large"
                        >
                            查看DXF文件
                        </Button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <Button
                            className="click-btn manual-btn"
                            onClick={handleOpenModal}
                            variant="contained"
                            size="large"
                        >
                            导入配置文件
                        </Button>
                        <Button
                            className="click-btn manual-btn"
                            onClick={handleOpenModal}
                            variant="contained"
                            size="large"
                        >
                            手动输入配置
                        </Button>
                        <Button
                            className="click-btn manual-btn"
                            onClick={handleOpenModal}
                            variant="contained"
                            size="large"
                        >
                            导出配置文件
                        </Button>
                        <Button
                            className="click-btn manual-btn"
                            onClick={handleOpenModal}
                            variant="contained"
                            size="large"
                        >
                            保存DXF文件
                        </Button>
                    </div>
                    <DataModal
                        openModal={openModal}
                        handleCloseModal={handleCloseModal}
                    />
                </Grid>
                <Grid md={9} lg={10} className="right-wrap">
                    {/* dxf-viewer */}
                    <div id="file-description" className="help-block" />
                    <div id="cad-view" />
                </Grid>
            </Grid>
        </Box>
    );
}
