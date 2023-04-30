import path from 'path';

export const uploadFile = async (files, folder = 'files') => {
    try {
        const ext = files['mimetype'].split('/')[1];
        const fileName = main_url + uuidv4() + '.' + ext;
        files.mv(
            path.join(__dirname, '..', 'public', 'uploads', folder, fileName)
        );
        const f = {
            name: files.name,
            src: fileName,
            size: files.size,
            ext: ext,
            mimetype: files.mimetype,
        };
        return f.src;
    } catch (e) {
        console.log(e.message);
    }
};
