// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  if(isJSON(localStorage.getItem("antd-pro-authority2")))
  {
    return JSON.parse(localStorage.getItem("antd-pro-authority2"))
  }
  else
  {
    return localStorage.getItem("antd-pro-authority2");
  }
 
}

export function setAuthority(authority) {
  return localStorage.setItem("antd-pro-authority2", JSON.stringify(authority));
}
function isJSON(str) {
  if (typeof str == 'string') {
      try {
          var obj=JSON.parse(str);
          if(typeof obj == 'object' && obj ){
              return true;
          }else{
              return false;
          }

      } catch(e) {
          return false;
      }
  }
}
