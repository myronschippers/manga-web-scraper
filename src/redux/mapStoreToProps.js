const mapStoreToProps = (...keyList) => ((store) => {
    let specificStore = store;

    if (keyList != null && keyList.length !== 0) {
        specificStore = {};

        for (let reducerKey of keyList) {
            if (store[reducerKey] != null) {
                specificStore[reducerKey] = store[reducerKey];
            }
        }
    }

    return {
        store: specificStore,
    };
});

export default mapStoreToProps;
