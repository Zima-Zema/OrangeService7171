var { Subscriber } = require('../models/subscriber');
 
function subscribe(subscriber) {
    return new Promise(function (resolve, reject) {
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
                var sub = new Subscriber({
                        ...subscriber
                    })
                    .save()
                    .then((doc) => resolve(doc))
                    .catch((err) => reject(err));
            }
        }).catch((err) => reject(err));
    })

}


function unSubscribe(subscriber) {
    return new Promise(function(resolve, reject){
        Subscriber.findOneAndUpdate({
            msisdn: subscriber.msisdn
        }, {
            $set: {
                eventType: subType.unSubscribe
            }
        }, {new: true}).then((doc) => {
            if (doc) {
                resolve(doc);
            }else {
                reject(false);
            }
        }).catch((err) => reject(err));
    })
}

module.exports={
    SubscriptionService:{
        subscribe:subscribe,
        unSubscribe:unSubscribe
    }
}