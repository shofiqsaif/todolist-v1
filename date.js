module.exports.getDate = getDate;
function getDate(){
    var options = { 
        weekday: 'long',
         day: 'numeric',
         month: 'long'
        };
    var date = new Date();
    
    var today = date.toLocaleDateString("en-US", options);

    return today;
}

exports.getDay = () =>{
    var options = { 
        weekday: 'long',
        };
    var date = new Date();
    
    var today = date.toLocaleDateString("en-US", options);

    return today;
};

// console.log(today.toLocaleDateString("en-US")); // 9/17/2016
// console.log(today); // Saturday, September 17, 2016

// console.log(getDate());

console.log(module.exports);