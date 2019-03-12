'use strict';
/**
 * NUGU용으로 만들어진 NUGU JS
 * NUGU™의 브랜드는 SK에 있습니다.
 * Copyright (c) LunaStratos (LunaStratos@gmail.com)
 * Reference : https://developers.nugu.co.kr/docs/
 */

//Module
const nuguModule = require('./nuguModule.js')

//Module Start
module.exports = (request, response = {}) => nuguModule(request, response)
