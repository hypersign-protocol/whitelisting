const URL_REGX = new RegExp(
  "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
);

export function validateURL(url) {
  return new Promise((resolve, reject) => {
    if (!URL_REGX.test(url)) {
      reject(true); 
    }
  });
}


export function validateDate(date){
  return new Promise((resolve, reject) => {
    if(isNaN(Date.parse(date))){
      reject("invalid date");
    }
  })
}