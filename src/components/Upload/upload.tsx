import React, { ChangeEvent, FC, useRef, useState } from "react";
import axios from "axios";
import UploadList from "./upoadList";
import Dragger from "./dragger";

export type UploadFileStatus = "ready" | "uploading" | "success"
    | "error";

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    /**保存文件的原始信息 */
    raw?: File;
    response?: any;
    error?: any;

};

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: { [key: string]: any };
    name?: string;
    data?: { [key: string]: any };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
};

export const Upload: FC<UploadProps> = (props) => {
    const {
        action, onProgress,
        onSuccess, onError,
        beforeUpload, onChange,
        defaultFileList, onRemove,
        name, headers, data, withCredentials,
        accept, multiple, children, drag
    } = props;
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        //异步修改file对象的值
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file;
                };
            });
        });
    };
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        };
        uploadFile(files);
        if (fileInput.current) {
            fileInput.current.value = "";
        };
    };
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid);
        });
        if (onRemove) {
            onRemove(file);
        };
    };
    const uploadFile = (files: FileList) => {
        let postFiles = Array.from(files);
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file);
            } else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile);
                    });
                } else if (result !== false) {
                    post(file);
                };
            };
        });
    }
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + "upload-file",
            status: "ready",
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        // setFileList([_file, ...fileList]);
        setFileList(prevList => {
            return [_file, ...prevList]
        });
        const foramData = new FormData();
        foramData.append(name || "file", file);
        if (data) {
            Object.keys(data).forEach(key => {
                foramData.append(key, data[key]);
            })
        }
        axios.post(action, foramData, {
            headers: {
                ...headers,
                "Content-Type": "multipart/form-data",
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                console.log(e)
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: "uploading" });
                    console.log(132);
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(res => {
            console.log(res);
            updateFileList(_file, { status: "success", response: res.data });
            if (onSuccess) {
                onSuccess(res.data, file);
            };
            if (onChange) {
                onChange(file);
            };
        }).catch(err => {
            console.error(err);
            updateFileList(_file, { status: "error", error: err });
            if (onError) {
                onError(err, file);
            };
            if (onChange) {
                onChange(file);
            };
        });
    }
    console.log(fileList);
    return (
        <div
            className="chenlegion-upload-component"
        >

            <div className="chenlegion-upload-input"
                style={{ display: "inline-block" }}
                onClick={handleClick}
            >
                {drag ? <Dragger onFile={(files) => uploadFile(files)}>{children}</Dragger> : children}
                <input
                    className="chenlegion-file-input"
                    style={{ display: "none" }}
                    ref={fileInput}
                    type="file"
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
};

Upload.defaultProps = {
    name: "file",

}

export default Upload;