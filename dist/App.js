import axios from 'axios';
import React from 'react';
var App = function () {
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (files) {
            var uploadedFile = files[0];
            var formData = new FormData();
            formData.append(uploadedFile.name, uploadedFile);
            axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(function (res) {
                console.log(res);
            });
        }
    };
    return (React.createElement("div", { className: "App", style: { marginTop: "100px", marginLeft: "100px" } },
        React.createElement("input", { type: "file", name: "myFile", onChange: handleFileChange })));
};
export default App;
