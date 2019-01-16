'use strict';
/**
 * 누구용으로 만들어진 NUGU JS
 * request :
 * response:
 * data: {name: value} 형태로 만들어진 json
 */
const makeJson = require('./json/json_nugu.js')
const makeJsonStream = require('./json/json_nuguStream.js')


/**아래 내용으로 채우기
 */
module.exports = (request,response  = {}) => {

  const req = request
  const res = response

  let output = {}


  return {
    /**
     * actionName얻는 부분
     */
     name: () => {
        const actionName = req.body.action.actionName
       return actionName
     },
     /**
      * 하나의 파라메터 값 얻
      *  valueName : String
      *  return : 키에 대한 값 value
      */
     get: (valueName) => {
       const parameters = req.body.action.parameters
       let value = "";
       if (parameters.hasOwnProperty(valueName)) {
         value = parameters[valueName].value
       }else{
         value = undefined
       }
       return value
     },

     /**
      * 여러개의 parameters 얻기
      * return json ({이름 : 값,이름 : 값}  형식으로 반환)
      */
     getAll: () => {
       const parameters = req.body.action.parameters
       const keys = Object.keys(parameters);
       let arr = {}
       for(let i  = 0 ; i <keys.length ; i++){
          arr[keys[i]] = parameters[keys[i]].value
       }
       return arr
     },
     /**
      * ssml사용시
      */
    say: (valueData) => {
      const jsonResult = makeJson(valueData)
      return res.send(jsonResult)
    },
    /**
     * ssml사용시
     */
    ssml: (url) => {
      const offsetInMilliseconds = req.body.context.supportedInterfaces.AudioPlayer.offsetInMilliseconds
      let paramaterValue = req.body.parameters.type.value
      const jsonResult = makeJsonStream(paramaterValue, url, offsetInMilliseconds)
      return res.send(jsonResult)
    },
    /**
     * Oauth시 accessToken 얻기
     */
    token: () => {
      let getToken = ""
      if (req.body.context.session.hasOwnProperty('accessToken')) {
          getToken =  req.body.context.session.accessToken
      }else{
          getToken =  undefined
      }
        return getToken

    }
  }
}
