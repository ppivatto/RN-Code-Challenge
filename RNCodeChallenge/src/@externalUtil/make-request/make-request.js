import normalizers from './normalizers/index';
import {startRequest, endRequest, addError} from './actions';
import {Alert} from 'react-native';

/**
 *
 * @param {function} promiseCall
 * @param {object} data
 * @param {string} [data.id]
 * @param {object} [data.body]
 * @param {object} [data.params]
 * @param {function} dispatch
 * @param {object} options
 * @param {function} [options.beforeNormalize]
 * @param {function} [options.normalizer]
 * @param {boolean} [options.shouldNormalize]
 * @param {boolean} [options.useMongoNormalizer]
 * @param {string} [options.startRequestActionType]
 * @param {string} [options.endRequestActionType]
 * @param {boolean} [options.silent]
 * @return Promise
 */
export default function makeRequest(
    promiseCall,
    data = {id: '', body: {}, params: [], options: {}},
    dispatch,
    options = {},
) {
    if (options.normalizer === undefined) {options.normalizer = null}
    if (options.useMongoNormalizer === undefined) {options.useMongoNormalizer = false}
    if (options.shouldNormalize === undefined) {options.shouldNormalize = false}
    if (options.silent === undefined) {options.silent = false}

    dispatch(startRequest(options.startRequestActionType));

    const normalizer = (options.normalizer) ? options.normalizer :
        (options.useMongoNormalizer) ? normalizers.mongoArrayNormalize : normalizers.arrayNormalize;

    return new Promise((resolve, reject) => {
        try {
            promiseCall(data)
                .then(resp => {
                    dispatch(endRequest(options.endRequestActionType));

                    let payload = resp;

                    if (options.shouldNormalize) {
                        payload = (options.beforeNormalize) ? options.beforeNormalize(resp) : resp;
                        payload = normalizer(payload);
                    }

                    resolve(payload)
                }).catch((error)=>{
                    dispatch(endRequest(options.endRequestActionType));
                    dispatch(addError(error));

                    Alert.alert(error.title, `${error.body} ${error.code}`);

                    reject(error);
                })

        } catch (err) {
            dispatch(endRequest(options.endRequestActionType));
            dispatch(addError({
                title: 'Internal Error',
                code: 500,
                // TODO: ADD ERROR MESSAGE SAME AS BE.
            }));

            reject(err);
        }
    })
}

function processData(data, normalize) {
    let formattedData = null;
    if (data) {
        data = (data.constructor().toString() === "[object Object]") ? normalize([data]) : normalize(data);
        formattedData =  {
            data: ((data.entities && data.entities.data) ? data.entities.data : null),
            list: ((data.result) ? data.result : null),
        }
        if (data.constructor().toString() === "[object Object]") {
            formattedData.item = (formattedData.list.length === 1) ? formattedData.data[formattedData.list[0].toString()] : null;
        }
    }
    return formattedData;
}