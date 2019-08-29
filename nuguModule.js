const makeJson = require('./json/json_nugu.js')
const makeJsonStream = require('./json/json_nuguStream.js')

module.exports = (request, response) => {
    /**
     * request response 받아두기
     */
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
       * Oauth시 계정연동 체크
       * return : true false
       */
      oauthFlag: () => {
        let flag = false
        if (req.body.context.session.hasOwnProperty('accessToken')) {
          flag = true
        }
        return flag
      },

      /**
       * Oauth시 accessToken 얻기
       * return String
       */
      accessToken: () => {
        let getToken = ''
        if (req.body.context.session.hasOwnProperty('accessToken')) {
          getToken = req.body.context.session.accessToken
        } else {
          getToken = undefined
        }
        return getToken

      },

      /**
       * 하나의 파라메터 값 얻
       *  valueName : String
       *  return : 키에 대한 값 value
       */
      get: (valueName) => {
        let value = '';

        if (req.body.action.hasOwnProperty('parameters')) {
          if (Object.keys(req.body.action.parameters).length === 0) {
            /**
             * 값 없음.
             * {} 값 방지.
             * undefined 출력
             */
            value = undefined
          } else {
            /**
             * parameters 값 있음
             */
            const parameters = req.body.action.parameters
            //파라메터의 이름 찾기
            if (parameters.hasOwnProperty(valueName)) {
              value = parameters[valueName].value
            } else {
              value = undefined
            }
          }
        } else {
          value = undefined
        }
        return value
      },

      /**
       * 여러개의 parameters 얻기
       * return json ({이름 : 값,이름 : 값}  형식으로 반환)
       */
      getAll: () => {
        let arr = {}
        if (req.body.action.hasOwnProperty('parameters')) {
          if (Object.keys(req.body.action.parameters).length === 0) {
            /**
             * 값 없음.
             * undefined 출력
             */
            value = undefined
          } else {
            const parameters = req.body.action.parameters
            const keys = Object.keys(parameters);

            for (let i = 0; i < keys.length; i++) {
              arr[keys[i]] = parameters[keys[i]].value
            }
          }
        } else {
          arr = undefined
        }

        return arr
      },

      /**
       * 디바이스 타입
       * param :
       * return: String
       */
      deviceType: () => {
        let type = ''
        if (req.body.context.device.hasOwnProperty('type')) {
          type = req.body.context.device.type
        } else {
          type = undefined
        }
        return type
      },

      /**
       * 디바이스 State
       * param :
       * return: ?
       */
      deviceState: () => {
        let type = ''
        if (req.body.context.device.hasOwnProperty('type')) {
          type = req.body.context.device.states
        } else {
          type = undefined
        }
        return type
      },
      /**
       * 새로 방문자 여부
       * return: Boolean
       */
      isNew: () => {
        let isNew = false
        if (req.body.context.session.hasOwnProperty('isNew')) {
          isNew = req.body.context.session.isNew
        } else {

        }
        return isNew
      },

      /**
       * [playerActivity description]
       * @return {String} 설정한 String
       */
      playerActivity: () => {
        const jsonResult = ''
        let value = ''
        if (req.body.context.supportedInterfaces == null) {
          //문제 있음
          value = undefined
        } else {
          const playerActivity = req.body.context.supportedInterfaces.AudioPlayer.playerActivity
          value = playerActivity
        }

        return value
      },
      /**
       * [getSecond description]
       * @return Int offsetInMilliseconds
       */
      getSecond: () => {

        let value = ''
        if (req.body.context.supportedInterfaces == null) {
          //문제 있음
          value = undefined
        } else {
          const offsetInMilliseconds = req.body.context.supportedInterfaces.AudioPlayer.offsetInMilliseconds
          value = offsetInMilliseconds
        }

        return value
      },
      /**
       * [audioToken description]
       * @return String audioToken
       */
      audioToken: () => {

        let value = ''
        if (req.body.context.supportedInterfaces == null) {
          //문제 있음
          value = undefined
        } else {
          const audioToken = req.body.context.supportedInterfaces.AudioPlayer.token
          value = audioToken
        }

        return value
      },
      /**
       * 일반 대화
       * @param
       * valueData: object
       * return: String
       * {}
       */
      say: (valueData) => {
        let parameterJson = {}
        if (valueData.hasOwnProperty('parameter')) {
          parameterJson = valueData.parameter
        } else {

        }
        const jsonResult = makeJson(parameterJson)
        return res.send(jsonResult)
      },
      /**
       */
      audioPlay: (valueData) => {
        let token = ''
        if (req.body.context.supportedInterfaces == null) {
          //문제 있음
          token = 'undefined'
        } else {
          token = req.body.context.supportedInterfaces.AudioPlayer.token
        }
        let parameter = {}
        const url = valueData.url
        const offsetInMilliseconds = valueData.second

        if (valueData.hasOwnProperty('parameter')) {
          parameter = valueData.parameter
        }
        const jsonResult = makeJsonStream(parameter, url, offsetInMilliseconds, token)
        console.log(JSON.stringify(jsonResult))
        return res.send(jsonResult)
      },

      /**
       *  privateUserInfo
       *  등록된 유저 정보 json
       *  return Json
       */
      privateUserInfo: () => {
        let value = {};
        if (req.body.hasOwnProperty('profile') ){
            value = req.body.profile.privatePlay.enrolledUser
          } else {}
          return value
        },

        /**
         * Private mode시 특별한 Device Id
         * return String
         */
      privateDeviceId: () => {
        let value = {};
        if ( req.body.hasOwnProperty('profile') ){
            value = req.body.profile.privatePlay.deviceUniqueId
          } else {
            value = undefined
          }

          return value
        },
      /*
        예외 처리 code 전송        
      */
      exception: (valueData) => {
        let parameterJson = {}
        parameterJson["resultCode"] = valueData
        
        return res.send(parameterJson)
      }
    }
}
