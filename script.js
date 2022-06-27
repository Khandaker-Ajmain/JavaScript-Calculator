// finding element
const themeToggoler = document.querySelector('.theme-toggler');
const buttons = document.querySelectorAll('.btn');
const current = document.querySelector('#curent');
const history = document.querySelector('#history');

// Toggle Theme mode
let themeCounter = 0;
const changeTheme = themeToggoler.addEventListener('click', () => {
    themeCounter++;
    let rootVer = document.querySelector(':root');
    
    if(themeCounter % 2 == 0){
        rootVer.style.setProperty('--primary-color', '#1565C0');;
        rootVer.style.setProperty('--calculator-background-color', '#191A1E');
        rootVer.style.setProperty('--background-color', '#12263d');
        rootVer.style.setProperty('--gray-color', '#bbb');
        rootVer.style.setProperty('--white-color', '#fff');
        rootVer.style.setProperty('--black-color', '#000');
    }else{
        rootVer.style.setProperty('--primary-color', '#5cb0f3');;
        rootVer.style.setProperty('--calculator-background-color', '#fff');
        rootVer.style.setProperty('--background-color', '#3a72b2');
        rootVer.style.setProperty('--gray-color', '#71777d');
        rootVer.style.setProperty('--white-color', '#000');
        rootVer.style.setProperty('--black-color', '#bbb');
    }
   
})

// formate the display 
if(current.innerHTML.length == 0){
    current.innerHTML = 0;
}

// get buttonClicks 
for(let i = 0; i<buttons.length; i++){
    buttons[i].addEventListener('click', () => {
        let buttonValue = buttons[i].innerHTML;
        let buttonType = buttons[i].id;

        if(buttonValue == 'X'){
            buttonValue = '*';
        }else if(buttonValue == '÷'){
            buttonValue = '/';
        }

        calculation(buttonValue, buttonType)
    })
}

const calculation = (number, buttonType) => {
    let numOfCurent = current.innerHTML;
    let numOfhistory = history.innerHTML;
    
    if(buttonType == 'number'){
        if(numOfCurent == 0){

            current.innerHTML = "";
            current.innerHTML = number;

        }else{
    
            let numOfCurentPlain = numOfCurent.replace(/,/g,'') 
            let updateCurrent = Number(numOfCurentPlain + number);
            let formateCurrent = updateCurrent.toLocaleString('en-US');
            current.innerHTML = formateCurrent;

        }
    }else if(buttonType == 'oparetor'){

        if(numOfhistory == 0){

            let getCurent = numOfCurent.replace(/,/g,'');
            current.innerHTML = "0";
            let formateHistory = Number(getCurent);
                formateHistory = history.innerHTML = formateHistory.toLocaleString('en-US') + number;

        }else{
            
            let getCurent = numOfCurent.replace(/,/g,'');
            current.innerHTML = "0";
            let formateHistory = Number(getCurent);
                formateHistory = formateHistory.toLocaleString('en-US') + number; 
            let addWithHistory = numOfhistory + formateHistory
                history.innerHTML =  addWithHistory;

        }
    }else if(buttonType == 'clear') {

        let numOfCurentPlain = numOfCurent.replace(/,/g,'');
        let clearLast = Number(numOfCurentPlain.slice(0, -1));
        let formateClear = clearLast.toLocaleString('en-US');
            current.innerHTML = formateClear;
        
    }else if(buttonType == 'all-clear'){

        current.innerHTML = "0";
        history.innerHTML = "0";

    }else if(buttonType == 'equal'){

        let calculate = numOfhistory.replace(/,/g,'') + numOfCurent.replace(/,/g,'');
        history.innerHTML = "0";
        current.innerHTML = eval(calculate);
        console.log(eval(calculate));

    }
    
}