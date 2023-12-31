const urlButton = document.querySelector('.copy-button');
const filename = document.getElementById('filename');
const expires = document.getElementById('expires');
const downloadBtn = document.getElementById('downloadBtn');

// file path
let fileToDownload = '';

let downloaderIp = '';
let fileId = '';
let downloadDate = '';

function OnStartup() {
    // Call the PHP file using AJAX
    $.ajax({
        url: "Download.php",
        method: "GET",
        // dataType: "json", // Add this line to expect JSON response
        data: { file: getUrlParam("file") }, // Pass the file identifier as a parameter
        success: function (response) {
            console.log(response);
            if (response.file_name) {
                fileToDownload = response['file_path'];
                downloaderIp = response['downloader_ip']; // Set downloaderIp
                fileId = response['file_id']; // Set fileId
                downloadDate = response['download_date']; // Set downloadDate
                $("#filename").text(response.file_name);
                $("#expires").text("Expires in: " + formatTimeRemaining(response));

            } else {
                // File not found, redirect to error.html
                //window.location.href = "error.html";
            }
        },
        error: function (xhr, status, error) {
            console.error(error); // Log any errors
            // File not found, redirect to error.html
            //window.location.href = "error.html";
        }
    });
}

function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function formatTimeRemaining(response) {
    const { days_remaining, hours_remaining, minutes_remaining, seconds_remaining } = response;
    return `${days_remaining} days, ${hours_remaining} hours, ${minutes_remaining} minutes, ${seconds_remaining} seconds`;
}

OnStartup();

function CopyUrl() {
    const url = window.location.href;
    const textarea = document.createElement('textarea');
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    urlButton.innerHTML = "✔";
}

urlButton.addEventListener("click", CopyUrl);

function changeButtonLabel() {
    urlButton.innerHTML = "Copy link";
}

urlButton.addEventListener('mouseleave', changeButtonLabel);

// JavaScript code when a user downloads a file
function recordDownload(downloaderIp, fileId, downloadDate) {
    $.ajax({
        url: "DownloaderInfo.php",
        method: "POST",
        data: { 
            downloader_ip: downloaderIp,
            file_id: fileId,
            download_date: downloadDate
        },
        success: function (response) {
            console.log("File downloaded");
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}


downloadBtn.addEventListener('click', function () {
    window.location.href = fileToDownload;
    recordDownload(downloaderIp, fileId, downloadDate); // Pass the parameters here
});
