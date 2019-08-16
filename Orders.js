function modalPopUp(){
    const button = document.querySelector('.submit-order');
    const receipt = document.getElementById('receipt');
    const receiptContainer = document.querySelector('receipt-container');
    
    // button.addEventListener('click', () => {
    //   receipt.style.display = 'block';
    //   receipt.classList.add('modalShow'); 
    // });
    
    button.addEventListener('click', ()=> {
       alert('Clicked on the button'); 
    });
}

module.exports = modalPopUp;