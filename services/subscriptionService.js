var { Subscriber } = require('../models/subscriber');

function subscribe(subscriber) {
    return new Promise(function (resolve, reject) {

        var model = new Subscriber({
            ...subscriber
        });
        var error = model.validateSync();
        var errArray = [];
        for (const key in error.errors) {
            if (error.errors.hasOwnProperty(key)) {
                errArray.push(error.errors[key].message);

            }
        }
        if (errArray.length > 0) {
            reject(errArray);
        }
        Subscriber.findOneAndUpdate({
            msisdn: subscriber.msisdn
        }, {
            $set: {
                eventType: subType.subscribe
            }
        }, {new: true}).then((doc) => {
            if (doc) {
                resolve(doc);
            } else {
                model.save()
                    .then((doc) => resolve(doc))
                    .catch((err) => reject(err));
            }
        }).catch((err) => reject(err));
    });

}
var ss = {
    msisdn: "+201012109629"

}
subscribe(ss).then((data)=>console.log(data),(error)=>console.log("reject",error)).catch(err=>console.log("catch".err))
function unSubscribe(subscriber) {
    return new Promise(function (resolve, reject) {
        Subscriber.findOneAndUpdate({
            msisdn: subscriber.msisdn
        }, {
            $set: {
                eventType: subType.unSubscribe
            }
        }, {new: true}).then((doc) => {
            if (doc) {
                resolve(doc);
            } else {
                reject(false);
            }
        }).catch((err) => reject(err));
    })
}

module.exports = {
    SubscriptionService: {
        subscribe: subscribe,
        unSubscribe: unSubscribe
    }
}