'use strict';


module.exports = (valueJson  = {}) =>{
  let jsonReturn =
  {
             "version": "2.0",
             "resultCode": "OK",
             "output": {
               "type": parameters.type.value,
             },
             "directives": [
               {
                 "type": "AudioPlayer.Play",
                 "audioItem": {
                     "stream": {
                         "url": url,
                         "offsetInMilliseconds": offsetInMilliseconds,
                         "progressReport": {
                             "progressReportDelayInMilliseconds": 0,
                             "progressReportIntervalInMilliseconds": 0
                         },
                         "token": token,
                         "expectedPreviousToken": "anything"
                     },
                     "metadata": { } // reserved
                 }
               }
             ]
         }
  jsonReturn.output = valueJson
  return jsonReturn;
}
