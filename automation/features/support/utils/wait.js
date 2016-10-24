// waits in milliseconds
// wait(1000); //=> this waits for 1sec

function wait(ms) {

    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

module.exports = wait;
