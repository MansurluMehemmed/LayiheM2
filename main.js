const input1= document.querySelector('.input1');
const input2 = document.querySelector('.input2');
const p1 = document.querySelector('.p1')
const p2 = document.querySelector('.p2')
const liActiveRight = document.querySelectorAll('.right li');
const liActiveLeft = document.querySelectorAll('.left li');
const allLi = document.querySelectorAll('li')
const calc = function(option1,option2){
    const divLeftLi = document.querySelector('.left .active')
    const divRightLi = document.querySelector('.right .active');
    let firstValue;
    let secondValue;
    fetch('https://v6.exchangerate-api.com/v6/6fc87da6cc6f97464611538f/latest/USD')
.then((response)=>response.json())
.then(data=>{
    firstValue=data.conversion_rates[divLeftLi.textContent]
    secondValue=data.conversion_rates[divRightLi.textContent]
    if(option1===1){
        input2.value = Math.round(((option2 * secondValue) / firstValue)* 1000) / 1000;
    }else{
        p1.textContent = `${divLeftLi.textContent} = ${Math.round(((option2 * secondValue) / firstValue) * 1000) / 1000} ${divRightLi.textContent}`
        p2.textContent = `${divRightLi.textContent} = ${Math.round(((option2 * secondValue) / firstValue) * 1000) / 1000} ${divLeftLi.textContent}`
    }
})
}
liActiveLeft.forEach(item=>{
    item.addEventListener('click',()=>{
        const divLeftLi2 = document.querySelector('.left .active')
        divLeftLi2.classList.remove('active');
        item.classList.add('active')
    })
})
liActiveRight.forEach(item=>{
    item.addEventListener('click',()=>{
        const divRightLi2 = document.querySelector('.right .active')
        divRightLi2.classList.remove('active');
        item.classList.add('active')
    })
})
input1.addEventListener('input',()=>{
    calc(1,Number(input1.value))
})
allLi.forEach(item=>{
item.addEventListener('click',()=>{
    calc(1,Number(input1.value));
})
})
