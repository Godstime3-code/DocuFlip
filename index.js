const uploadButton = document.querySelector(".upload_button");
const fileInput = document.querySelector("#file_input");
const conversionResult = document.querySelector('.convertionHtml')
    
const apikey =
    "APY0SuyEosaqXqdEQUURXmdIB4PM2swZMt0HptRo1in96km7QiwbXDlVe9LJQBfvKj9aE";
const apiurl = "https://api.apyhub.com/convert/word-file/pdf-file";
uploadButton.addEventListener("click", e => {
    e.preventDefault();
    fileInput.click();
});

fileInput.addEventListener("change", (e)=>{
  const file = fileInput.files[0];
  const fileType = file.type;
  const fileSize = file.size;
  console.log(file)
  // check if a file exist 
  if(file === undefined){
    alert('Please upload a file');
  }
  
  if(fileType !== 'application/msword' &&  fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
    alert('please select a word document')
    return
    
  }
  
  // create a new form data 
  
  const username = 'Gtech';
const password = 'Piouskijnr112?';

const authenticationString = `${username}:${password}`;
const encodedAuthenticationString = btoa(authenticationString);
  const formData = new FormData();
  formData.append('file', file);
  console.log(typeof formData)
  const headers = {
    'apy-token': apikey,
    'Authorization': `Basic  ${encodedAuthenticationString}`,
  }
  
  
  fetch(apiurl, {
    method: 'POST',
    headers: headers,
    body: formData
  }).then((response)=>{
    
    return response.blob();
  }).then(blob => {
    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element for download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_file.pdf'; // Set the filename
    a.style.display = 'none'; // Hide the link
    document.body.appendChild(a);
    a.click(); // Simulate a click to trigger the download
    window.URL.revokeObjectURL(url); // Release the Blob URL

    conversionResult.innerHTML = "Conversion successful! Download started."; // Update message
}).finally(()=>{
  fileInput.value = ''
})
} );

