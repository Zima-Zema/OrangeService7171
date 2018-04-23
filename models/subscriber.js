var mongoose = require('mongoose');
var moment = require('moment');
var uniqid = require('uniqid');
const subType = {
    subscribe: "SUBSCRIBE",
    unSubscribe: "UNSUBSCRIBE"
}
var Schema = mongoose.Schema;

var subscriberSchema = new Schema({
    msisdn: {
        type: Number,
        required: true,
        index: true,
        unique: true,
        trim: true,
        minlength: 13
    },
    eventType: {
        type: String,
        required: true,
        trim: true
    },
    notificationId: {
        type: String,
        required: true,
        default: uniqid()
    },
    notificationTimestamp: {
        type: Date,
        default: moment().format('YYYY-MM-DD HH:mm:ss.SSSZ')
    },
    charged: {
        type: Boolean,
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 100
    },
    currentQId: {
        type: String,
        required: true,
        default: uniqid()
    }
});

var Subscriber = mongoose.model('Subscriber', subscriberSchema);

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