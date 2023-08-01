import axios from 'axios';
import toast from 'react-hot-toast';


export async function sendPasswordRecoveryEmail({ email, router, helpers }) {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API}/api/user/send-email`, {
            email,
        });

        router.push('/authentication/recovery-success');
    } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
        toast.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong! Please, try again later'
        );
    }
}

export async function updateUserPassword({
    new_password,
    router,
    helpers,
    auth,
}) {
    try {
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API}/api/user/update-password`,
            headers: { auth },
            data: { new_password },
        });

        router.push('/authentication/reset-success');
    } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
        toast.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong! Please, try again later'
        );
    }
}

export async function getUploadedFileResults({ data, update }) {
    try {
        const result = await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API}/api/user/upload-file`,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
                auth: localStorage.getItem('token'),
            },
        });
        update();
        return result.data;
    } catch (error) {
        toast.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong! Please, try again later'
        );
    }
}

export async function getUserProfile() {
    try {
        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/user/profile`,
            {
                headers: {
                    auth: localStorage.getItem('token'),
                },
                // withCredentials: true,
            }
        );
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function editUserProfile() {}

export async function getUsersPfofiles() {
    try {
        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/admin/user/all-users`,
            {
                headers: {
                    auth: localStorage.getItem('token'),
                },
                // withCredentials: true,
            }
        );
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllCompanyReports() {
    try {
        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/user/reports`,
            {
                headers: {
                    auth: localStorage.getItem('token'),
                },
                // withCredentials: true,
            }
        );
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getCategoryData({ id, category }) {
    try {
        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/user/filtered-reports/${id}?category=${category}`,
            {
                headers: {
                    auth: localStorage.getItem('token'),
                },
                // withCredentials: true,
            }
        );
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function inviteCompanyUser({ data, handleClose, resetForm }) {
    try {
        const res = await axios({
            url: `${process.env.NEXT_PUBLIC_API}/api/user/add-user`,
            method: 'POST',
            data,
            headers: {
                auth: localStorage.getItem('token'),
            },
        });
        toast.success(res.data?.message);
        handleClose();
    } catch (error) {
        handleClose();
        toast.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong! Please, try again later'
        );
    }
}

export async function confirmAccount({ new_password, router, helpers, auth }) {
    try {
        await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API}/api/user/confirmation`,
            headers: { auth },
            data: { password: new_password },
        });

        router.push('/authentication/conformation-success');
    } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
        toast.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong! Please, try again later'
        );
    }
}

export async function getCompaniesListAll() {
    try {
        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/admin/company/all`,
            {
                headers: {
                    auth: localStorage.getItem('token'),
                },
                // withCredentials: true,
            }
        );
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function adminCreateCompany({ data, update }) {
    try {
        const res = await axios({
            url: `${process.env.NEXT_PUBLIC_API}/api/admin/company/create-company`,
            method: 'POST',
            data,
            headers: {
                auth: localStorage.getItem('token'),
            },
        });
        update();
        toast.success(
            res.data?.message ? res.data?.message : 'Company created'
        );
    } catch (error) {
        toast.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong! Please, try again later'
        );
    }
}

export async function adminCreateUser({ data, update }) {
    try {
        const res = await axios({
            url: `${process.env.NEXT_PUBLIC_API}/api/admin/user/create-admin`,
            method: 'POST',
            data,
            headers: {
                'Content-Type': 'application/json',
                auth: localStorage.getItem('token'),
            },
        });
        update();
        toast.success(res.data?.message ? res.data?.message : 'User created');
    } catch (error) {
        console.log(error);
        toast.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong! Please, try again later'
        );
    }
}

export async function getRecentUploads() {
    try {
        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/user/last-uploads`,
            {
                headers: {
                    auth: localStorage.getItem('token'),
                },
                // withCredentials: true,
            }
        );
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateUserOldPassword(data) {
    try {
        const res = await axios({
            url: `${process.env.NEXT_PUBLIC_API}/api/user/profile-password`,
            method: 'POST',
            data,
            headers: {
                auth: localStorage.getItem('token'),
            },
        });
        toast.success(res.data?.message ? res.data?.message : 'User created');
    } catch (error) {
        toast.error(
            error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong! Please, try again later'
        );
    }
}

export async function getTotalStats(query) {
    try {
        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/admin/user/statistics?filter=${query?.filter}&&personal=${query?.personal}`,
            {
                headers: {
                    auth: localStorage.getItem('token'),
                },
                // withCredentials: true,
            }
        );
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getOverView(query) {
    try {
        const result = await axios({
            url: `${process.env.NEXT_PUBLIC_API}/api/admin/user/multi-statistics`,
            method: 'GET',
            params: query,
            headers: {
                auth: localStorage.getItem('token'),
            },
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getCategoriesList() {
    try {
        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/admin/categories`,
            {
                headers: {
                    auth: localStorage.getItem('token'),
                },
                // withCredentials: true,
            }
        );
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const useEmailAndPassowrdLogin = async (data) => {
    try {
        const res = await axios({
            url: `${process.env.NEXT_PUBLIC_API}/api/auth/login`,
            method: 'POST',
            data,
        });
        localStorage.setItem('token', res?.data?.token?.token);
    } catch (error) {
        console.log(error);
    }
};
