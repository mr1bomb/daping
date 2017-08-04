/**
 * Created by dell on 2017/6/23.
 */
/*window.onload = function() {
    order.get();
    play.get();
    user.get();
    relise.get();
    mess.get();
    window.onresize = function() {
        order.get();
        play.get();
        user.get();
        relise.get();
        //mess.get();
    };
    setInterval(user.get, 8000);
    setInterval(play.get, 8000);
    setInterval(relise.get, 10000);
    setInterval(order.get, 12000);
    setInterval(mess.get, 16000);
    //mess.scroll();
};*/

var preview = 0;
/*var innerEl = $('#info-total');
var rollEl = innerEl.parent();
var waitEl = innerEl.clone(true).removeAttr('id');
rollEl.append(waitEl);
var tmp;
var y = 0;*/
$('#btn-preview').click(function() {
    if (preview == 0) {
        preview = 1;
        $('#btn-preview').html('真实模式');
        //console.log(preview+'参观模式');
    } else {
        preview = 0;
        $('#btn-preview').html('参观模式');
        //console.log(preview+'真实模式');
    }
})
$(document).ready(function() {
    $('#info-total').height($('#info-total').height() - 18);
    scroll.init(document.getElementById('info-total'));
	order.get();
	play.get();
	user.get();
	relise.get();
	mess.get();
    /*d3.timer(function () {
        y = y - 0.1;
        console.log(y);
        innerEl.css({
            top: y
        });
        waitEl.css({
            top: y + innerEl.height()
        });
        if (y * -1 > innerEl.height()) {
            y = 0;
            tmp = innerEl;
            innerEl = waitEl;
            waitEl = tmp;
        }
    });*/
	setInterval(user.get, 8000);
  setInterval(play.get, 8000);
  setInterval(relise.get, 10000);
  setInterval(order.get, 12000);
  setInterval(mess.get, 260000);
	window.onresize = function() {
		window.location.reload();
		/*setTimeout(function() {
			order.get();
			play.get();
			user.get();
			relise.get();
			mess.get();
		}, 2000);*/
  };
});