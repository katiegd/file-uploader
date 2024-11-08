const uploadButton = document.querySelector(".upload-btn");
const fileForm = document.querySelector("#fileUpload");

uploadButton.addEventListener("click", (e) => {
  e.preventDefault();
  fileForm.click();
});

fileForm.addEventListener("change", () => {
  if (fileForm.files.length > 0) {
    console.log("File selected", fileForm.files);
  }

  fileForm.closest("form").submit();
});
