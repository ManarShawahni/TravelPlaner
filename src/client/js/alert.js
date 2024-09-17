// alert.js

// Custom Alert logic
const showAlert = (message) => {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    
    alertMessage.textContent = message;
    alertBox.style.display = 'flex';  // Show the alert box


    setTimeout(() => {
        hideAlert();
    }, 7000);
};

const hideAlert = () => {
    const alertBox = document.getElementById('customAlert');
    alertBox.style.display = 'none';
};

// Toast Notification logic
const showToast = (message) => {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.style.display = 'block';
    toast.style.opacity = 1;


    setTimeout(() => {
        hideToast();
    }, 7000);
};

const hideToast = () => {
    const toast = document.getElementById('toast');
    toast.style.opacity = 0;
    setTimeout(() => {
        toast.style.display = 'none';
    }, 500); 
};


document.getElementById('closeAlertButton').addEventListener('click', hideAlert);


export { showAlert, hideAlert, showToast, hideToast };