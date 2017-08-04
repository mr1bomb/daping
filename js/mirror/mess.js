var scroll = {
    init: function(gridwrap) {
        var self = this;
        if(self.setInterval) {
            clearTimeout(self.setInterval);
        } else {
            self.isMove = true;
            gridwrap.onmouseover = function() {
                self.isMove = false;
            }
            gridwrap.onmouseout = function() {
                self.isMove = true
            }
            self.scoll_fn = function() {
                if(!self.isMove) {
                    return;
                }
                if(gridwrap.scrollHeight <= gridwrap.scrollTop + gridwrap.offsetHeight) {
                    gridwrap.scrollTop = 0;
                } else {
                    gridwrap.scrollTop += 1;
                }
            }
        }
        self.setInterval = setInterval(self.scoll_fn, 100);
        
    }
};
var mess = {
     get: function() {
         var w = mess;

         $.get('http://172.16.100.65/mockjsdata/1/screen/bussiness_realtime?preview=' + preview).success(function(json) {
             /*{
              "code": 0,
              "msg": "success",
              "data": [
              {
              "id": 10788,
              "catOutcome": "OK",
              "updateTime": "2017-05-31 09:23:05",
              "userCode": "120388271",
              "subID": "02806612090000696",
              "smartCardID": "825010304924626",
              "startTime": "2017-05-31 09:23:05",
              "registerTime": "2017-05-28 09:23:05",
              "authStatus": "1"
              },
              {
              "id": 18440,
              "catOutcome": "FAIL",
              "updateTime": "2017-05-31 09:23:05",
              "userCode": "120388271",
              "subID": "02806612090000696",
              "smartCardID": "825010304924626",
              "startTime": "2017-05-31 09:23:05",
              "registerTime": "2017-05-28 09:23:05",
              "authStatus": "0"
              },
              {
              "id": 16274,
              "catOutcome": "OK",
              "updateTime": "2017-05-31 09:23:05",
              "userCode": "120388271",
              "subID": "02806612090000696",
              "smartCardID": "825010304924626",
              "startTime": "2017-05-31 09:23:05",
              "registerTime": "2017-05-28 09:23:05",
              "authStatus": "1"
              },
              {
              "id": 19007,
              "catOutcome": "OK",
              "updateTime": "2017-05-31 09:23:05",
              "userCode": "120388271",
              "subID": "02806612090000696",
              "smartCardID": "825010304924626",
              "startTime": "2017-05-31 09:23:05",
              "registerTime": "2017-05-28 09:23:05",
              "authStatus": "1"
              },
              {
              "id": 18160,
              "catOutcome": "OK",
              "updateTime": "2017-05-31 09:23:05",
              "userCode": "120388271",
              "subID": "02806612090000696",
              "smartCardID": "825010304924626",
              "startTime": "2017-05-31 09:23:05",
              "registerTime": "2017-05-28 09:23:05",
              "authStatus": "1"
              },
              {
              "id": 17106,
              "catOutcome": "OK",
              "updateTime": "2017-05-31 09:23:05",
              "userCode": "120388271",
              "subID": "02806612090000696",
              "smartCardID": "825010304924626",
              "startTime": "2017-05-31 09:23:05",
              "registerTime": "2017-05-28 09:23:05",
              "authStatus": "1"
              }
              ]
              }*/
             if (json.code == 0) {
                 var data = json.data;
                 $('#info-total tbody').html('');
                 $.each(data, function(k, v) {
                     //console.log(v.startTime);
                     var color = v.catOutcome == "OK" ? "c-white" : "c-red";
                     var colors = v.authStatus == '02' ? "c-white" : "c-red";
                     var el = ' <tr>' +
                         '<td>' + v.startTime + '</td>' +
                         '<td>' + v.userCode + '</td>' +
                         '<td>' + v.registerTime + '</td>' +
                         '<td>' + v.updateTime + '</td>' +
                         '<td class="' + color + '">' + (v.catOutcome == "OK" ? "正常" : "异常") + '</td> ' +
                         '<td>' + v.smartCardID + '</td> ' +
                         '<td>' + v.subID + '</td> ' +
                         '<td class="' + colors + '">' + (v.authStatus == '02' ? "成功" : "失败") + '</td> ' +
                         '</tr>';
                     $('#info-total tbody').append(el);

                 });
                 //_fun.scroll('info-total');
                 /*y=0;
                 waitEl = innerEl.clone(true).removeAttr('id');
                 rollEl.append(waitEl);*/
             }
         }).error(function(json){
             var json = {
                 "code": 0,
                 "msg": "success",
                 "data": [
                     {
                         "id": 10788,
                         "catOutcome": "OK",
                         "updateTime": "2017-05-31 09:23:05",
                         "userCode": "120388271",
                         "subID": "02806612090000696",
                         "smartCardID": "825010304924626",
                         "startTime": "2017-05-31 09:23:05",
                         "registerTime": "2017-05-28 09:23:05",
                         "authStatus": "1"
                     },
                     {
                         "id": 18440,
                         "catOutcome": "FAIL",
                         "updateTime": "2017-05-31 09:23:05",
                         "userCode": "120388271",
                         "subID": "02806612090000696",
                         "smartCardID": "825010304924626",
                         "startTime": "2017-05-31 09:23:05",
                         "registerTime": "2017-05-28 09:23:05",
                         "authStatus": "0"
                     },
                     {
                         "id": 16274,
                         "catOutcome": "OK",
                         "updateTime": "2017-05-31 09:23:05",
                         "userCode": "120388271",
                         "subID": "02806612090000696",
                         "smartCardID": "825010304924626",
                         "startTime": "2017-05-31 09:23:05",
                         "registerTime": "2017-05-28 09:23:05",
                         "authStatus": "1"
                     },
                     {
                         "id": 19007,
                         "catOutcome": "OK",
                         "updateTime": "2017-05-31 09:23:05",
                         "userCode": "120388271",
                         "subID": "02806612090000696",
                         "smartCardID": "825010304924626",
                         "startTime": "2017-05-31 09:23:05",
                         "registerTime": "2017-05-28 09:23:05",
                         "authStatus": "1"
                     },
                     {
                         "id": 18160,
                         "catOutcome": "OK",
                         "updateTime": "2017-05-31 09:23:05",
                         "userCode": "120388271",
                         "subID": "02806612090000696",
                         "smartCardID": "825010304924626",
                         "startTime": "2017-05-31 09:23:05",
                         "registerTime": "2017-05-28 09:23:05",
                         "authStatus": "1"
                     },
                     {
                         "id": 17106,
                         "catOutcome": "OK",
                         "updateTime": "2017-05-31 09:23:05",
                         "userCode": "120388271",
                         "subID": "02806612090000696",
                         "smartCardID": "825010304924626",
                         "startTime": "2017-05-31 09:23:05",
                         "registerTime": "2017-05-28 09:23:05",
                         "authStatus": "1"
                     }
                 ]
             };
             if (json.code == 0) {
                 var data = json.data;
                 $('#info-total tbody').html('');
                 $.each(data, function(k, v) {
                     //console.log(v.startTime);
                     var color = v.catOutcome == "OK" ? "c-white" : "c-red";
                     var colors = v.authStatus == '02' ? "c-white" : "c-red";
                     var el = ' <tr>' +
                         '<td>' + v.startTime + '</td>' +
                         '<td>' + v.userCode + '</td>' +
                         '<td>' + v.registerTime + '</td>' +
                         '<td>' + v.updateTime + '</td>' +
                         '<td class="' + color + '">' + (v.catOutcome == "OK" ? "正常" : "异常") + '</td> ' +
                         '<td>' + v.smartCardID + '</td> ' +
                         '<td>' + v.subID + '</td> ' +
                         '<td class="' + colors + '">' + (v.authStatus == '02' ? "成功" : "失败") + '</td> ' +
                         '</tr>';
                     $('#info-total tbody').append(el);

                 });
                 //_fun.scroll('info-total');
                 /*y=0;
                  waitEl = innerEl.clone(true).removeAttr('id');
                  rollEl.append(waitEl);*/
             }
         })
     }
 }





 //  function messs() {
 //      var w = this;
 //      $('#access-grid tbody').html('');
 //      $.get('http://172.16.100.65/mockjsdata/1/monitor/bussiness_realtime?apikey=123456').success(function(json) {
 //          if (json.code == 0) {
 //              var data = json.data;
 //              $('#info-total tbody').html('');
 //              $.each(data, function(k, v) {
 //                  console.log(v.startTime);
 //                  var color = v.catOutcome == "OK" ? "c-white" : "c-red";
 //                  var colors = v.authStatus ? "c-white" : "c-red";
 //                  var el = ' <tr>' +
 //                      '<td>' + v.startTime + '</td>' +
 //                      '<td>' + v.userCode + '</td>' +
 //                      '<td>' + v.registerTime + '</td>' +
 //                      '<td>' + v.updateTime + '</td>' +
 //                      '<td class="' + color + '">' + (v.catOutcome == "OK" ? "正常" : "异常") + '</td> ' +
 //                      '<td>' + v.smartCardID + '</td> ' +
 //                      '<td>' + v.subID + '</td> ' +
 //                      '<td class="' + colors + '">' + (v.authStatus ? "成功" : "失败") + '</td> ' +
 //                      '</tr>';
 //                  $('#info-total tbody').append(el);

 //              });
 //              _fun.scroll('info-total')
 //          }
 //      })
 //  }