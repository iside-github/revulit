export const categoryCreator = (obj) => {
    console.log(obj);
    let result = [];
    for (let [key, value] of Object.entries(obj)) {
        let newObj = {};
        newObj.category_id = key;
        newObj.category_title = categoryTitleCreator(key);
        newObj.category_count = value;
        result.push(newObj);
    }

    return result;
};

export const categoryTitleCreator = (text) => {
    var result = '';
    if (text.includes('_')) {
        result = text.split('_').join(' ');
        result = result.charAt(0).toUpperCase() + result.substring(1);
    } else {
        result = text.charAt(0).toUpperCase() + text.substring(1);
    }

    return result;
};
