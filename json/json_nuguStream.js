'use strict';


module.exports = (valueJson, url, offsetInMilliseconds, token) => {
  let jsonReturn = {
    "version": "2.0",
    "resultCode": "OK",
    "directives": [{
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
        "metadata": {} // reserved
      }
    }]
  }
  jsonReturn.output = valueJson
  return jsonReturn;
}
