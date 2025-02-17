const uploadButton = document.querySelector(".upload_button");
const fileInput = document.querySelector("#file_input");
const conversionResult = document.querySelector('.convertionHtml')
    
const apikey =
    "APY0djDf3hWRtmxmDHUac1VcVRdPsRRacLSyUShs8I2Fg50r6dLruNNFdE4p9ictd";
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
  
  if(fileType !== 'application/msword'){
    alert('please select a word document')
    return
    
  }
  
  // create a new form data 
  const formData = new FormData();
  formData.append('file', file);
  
  const headers = {
    'apy-token': apikey,
    'content-type': 'multipart/form-data'
  }
  
  fetch(apiurl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(formData)
  }).then((response)=>{
    console.log(response)
    return response.json();
  }).then((data)=>{
    conversionResult.innerHTML = `Conversion successful! Download your PDF file <a href="${data.downloadUrl}" target="_blank">here</a>.`;
  }).catch((error)=>{
    conversionResult.innerHTML = `Error: ${error.message}`
  })
} );