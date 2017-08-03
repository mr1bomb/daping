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
var innerEl = $('#info-total');
var rollEl = innerEl.parent();
var waitEl = innerEl.clone(true).removeAttr('id');
rollEl.append(waitEl);
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
	order.get();
	play.get();
	user.get();
	relise.get();
	mess.get();
    var y = 0;
    d3.timer(function () {
        y = y - 0.1;
        innerEl.css({
            top: y
        });
        waitEl.css({
            top: y + innerEl.height()
        });

        if (y * -1 > innerEl.height()) {
            y = 0;
            var tmp = innerEl;

            innerEl = waitEl;
            waitEl = tmp;
        }
    });
	setInterval(user.get, 8000);
  setInterval(play.get, 8000);
  setInterval(relise.get, 10000);
  setInterval(order.get, 12000);
  setInterval(mess.get, 6000);
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