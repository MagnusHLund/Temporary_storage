const percentLabel = document.getElementById("percent");
const dataLabel = document.getElementById("dataSpeed");
let percent

$(document).ready(function () {
    // Handle form submission with AJAX
    $("#upload-form").submit(function (e) {
        e.preventDefault();

        var form = $(this);
        var formData = new FormData(form[0]);

        var startTime = new Date().getTime();

        $.ajax({
            url: "Upload.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener(
                    "progress",
                    function (e) {
                        if (e.lengthComputable) {

                            // Show percentage when uploading file
                            percent = (e.loaded / e.total) * 100;
                            $("#progress").css("width", percent + "%");
                            percentLabel.innerHTML = `${percent.toFixed(2)}%`;

                            // Show data speed when uploading file
                            var currentTime = new Date().getTime();
                            var totalTime = (currentTime - startTime) / 1000; // Convert to seconds
                            var speedInBytesPerSecond = e.loaded / totalTime;
                            var speedInMbps = speedInBytesPerSecond * 8 / 1000000; // Convert to Mbps
                            dataLabel.innerHTML = `${speedInMbps.toFixed(2)} mbps`;
                        }
                    },
                    false
                );
                return xhr;
            },
            success: function (response) {
                // Handle success response here (display success message, etc.)
                console.log(response);
                const reply = response.download_url; // Use downloadUrl instead of downloadUrl
                const downloadUrl = reply.slice(0, -4)
                console.log(`${downloadUrl}`);
                window.location.href = `download.html?file=${downloadUrl}`;
            },
            error: function (xhr, status, error) {
                // Handle error response here (display error message, etc.)
                console.log(error);
            },
            complete: function () {
                // Reset the form and progress bar after completion
                $("#upload-form")[0].reset();
                $("#progress").css("width", "0%");
            },
        });
    });
});