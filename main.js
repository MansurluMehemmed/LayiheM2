const input1= document.querySelector('.input1');
const input2 = document.querySelector('.input2');
const p1 = document.querySelector('.p1');
const p2 = document.querySelector('.p2');
const liActiveRight = document.querySelectorAll('.right li');
const liActiveLeft = document.querySelectorAll('.left li');
const header = document.querySelector('header')
const main = document.querySelector('main')
const noInternet = document.querySelector('#noInternetMessage')


console.log(p1,p2);
let num = false;
let queryActive = 'USD'
let queryActive2 = 'RUB'

const func = function(option){
    const divLeftLi = document.querySelector('.left .active')
    const divRightLi = document.querySelector('.right .active');
    let firstValue;
    let secondValue;
    if(divLeftLi.textContent !== divRightLi.textContent){
        fetch('https://v6.exchangerate-api.com/v6/b6f2c54d6929bc5cb0d0b059/latest/USD')
        .then((response)=>response.json())
        .then(data=>{
            firstValue=data.conversion_rates[divLeftLi.textContent]
            secondValue=data.conversion_rates[divRightLi.textContent]
            
                input2.value = Math.round(((option * secondValue) / firstValue)* 1000) / 1000;
           
                p1.textContent = `1${divLeftLi.textContent} = ${Math.round(((1 * secondValue) / firstValue) * 1000) / 1000} ${divRightLi.textContent}`
                p2.textContent = `1${divRightLi.textContent} = ${Math.round(((1 * firstValue) / secondValue) * 1000) / 1000} ${divLeftLi.textContent}`
            
        })
    }
    else{
        input2.value = option;
        p1.textContent = `1${divLeftLi.textContent} = 1 ${divRightLi.textContent}`
        p2.textContent = `1${divRightLi.textContent} = 1 ${divLeftLi.textContent}`
    }
    
}


liActiveLeft.forEach(item=>{
    
    item.addEventListener('click',()=>{
        if(window.navigator.onLine){
            const divLeftLi2 = document.querySelector('.left .active')
                divLeftLi2.classList.remove('active');
                item.classList.add('active');
            if(queryActive !== document.querySelector('.left .active').textContent){
            console.log(queryActive)
                
                queryActive = document.querySelector('.left .active').textContent
                func(+(input1.value))
            }
        }
        else{
            main.style.display = 'none'
            header.style.display = 'none'
            noInternet.style.display = 'flex'
        alert('Internet bağlantınız yoxdur.')
        }    
    })
})
liActiveRight.forEach(item=>{
    item.addEventListener('click',()=>{
     if(window.navigator.onLine){
        const divRightLi2 = document.querySelector('.right .active')
        divRightLi2.classList.remove('active');
        item.classList.add('active');
    if(queryActive2 !== document.querySelector('.right .active').textContent){
        queryActive2 = document.querySelector('.right .active').textContent 
        func(+(input1.value))
    }
     }else{     main.style.display = 'none'
     header.style.display = 'none'
     noInternet.style.display = 'flex'
 alert('Internet bağlantınız yoxdur.')
 }       
    })
})
input1.addEventListener('input',()=>{
    func(Number(input1.value))
})


